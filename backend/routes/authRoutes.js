import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/Tenant.User.model.js";
import { Tenant } from "../models/Tenent.model.js";

export const authRoutes = express.Router();

// 🔑 Generate token
const generateTokenAndSetCookie = (user, res) => {
  const token = jwt.sign(
    { userId: user._id, tenantId: user.tenant },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

// SIGNUP ROUTE
authRoutes.post("/signup", async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, tenantCode } =
      req.body;

    if (!fullName || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let tenant;
    let role;

    if (tenantCode) {
      // case 1: join existing tenant
      tenant = await Tenant.findOne({ tenantCode });
      if (!tenant) {
        return res.status(400).json({ message: "Invalid tenant code" });
      }
      role = "Employee"; // default role when joining existing company
    } else {
      // case 2: create new tenant
      const newTenantCode = Math.random().toString(36).substring(2, 8);
      tenant = new Tenant({
        name: `${fullName}'s Company`,
        tenantCode: newTenantCode,
      });
      await tenant.save();
      role = "Owner"; // creator becomes owner
    }

    // create user linked to tenant
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      tenant: tenant._id,
      role,
    });

    await newUser.save();

    // add user to tenant.users array
    tenant.users.push(newUser._id);
    await tenant.save();

    generateTokenAndSetCookie(newUser, res);

    res.status(201).json({
      user: newUser,
      tenant,
      message: tenantCode
        ? `Signup successful, joined tenant ${tenant.name}`
        : `Signup successful, created new tenant ${tenant.name}`,
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🔑 LOGIN ROUTE
authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password, tenantCode } = req.body;

    if (!email || !password || !tenantCode) {
      return res
        .status(400)
        .json({ message: "Email, password and tenantCode required" });
    }

    const tenant = await Tenant.findOne({ tenantCode });
    if (!tenant) {
      return res.status(404).json({ message: "Tenant not found" });
    }

    const user = await User.findOne({ email, tenant: tenant._id });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or tenant" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    generateTokenAndSetCookie(user, res);

    res.status(200).json({
      user,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// 🚪 LOGOUT ROUTE
authRoutes.post("/logout", (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      maxAge: 1,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
