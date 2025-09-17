import jwt from "jsonwebtoken";
import { Tenant } from "../models/Tenent.model.js";

export const tenantMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ message: "Not authenticated" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.tenantId = decoded.tenantId;

    const tenant = await Tenant.findById(req.tenantId).populate("users");
    if (!tenant) return res.status(404).json({ message: "Tenant not found" });

    req.tenant = tenant;
    next();
  } catch (error) {
    console.error("Tenant Middleware Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
