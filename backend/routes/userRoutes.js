import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/Tenant.User.model.js";
import { Tenant } from "../models/Tenent.model.js";
import { tenantMiddleware } from "../middleware/tenantMiddleware.js";

export const userRoutes = express.Router();

// ✅ Create User (under tenant)
userRoutes.post("/", tenantMiddleware, async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const tenant = req.tenant;

    // check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      tenant: tenant._id,
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    // also push user into tenant.users array
    tenant.users.push(user._id);
    await tenant.save();

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Get all Users for Tenant
userRoutes.get("/", tenantMiddleware, async (req, res) => {
  try {
    const users = await User.find({ tenant: req.tenant._id });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Get User by ID (must belong to tenant)
userRoutes.get("/:id", tenantMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      tenant: req.tenant._id,
    });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update User (only inside tenant)
userRoutes.put("/:id", tenantMiddleware, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id, tenant: req.tenant._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User updated", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete User (only inside tenant)
userRoutes.delete("/:id", tenantMiddleware, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({
      _id: req.params.id,
      tenant: req.tenant._id,
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    // also remove from tenant.users
    await Tenant.findByIdAndUpdate(req.tenant._id, {
      $pull: { users: user._id },
    });

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
