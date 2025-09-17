import express from "express";
import { Tenant } from "../models/Tenent.model.js";
import jwt from "jsonwebtoken";
import { tenantMiddleware } from "../middleware/tenantMiddleware.js";

export const TenantsRouter = express.Router();

// ✅ Get current tenant (for logged-in user)
TenantsRouter.get("/me", tenantMiddleware, async (req, res) => {
  try {
    res.json(req.tenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// rosle based check owner or admin only change the tanents
TenantsRouter.put("/:id", tenantMiddleware, async (req, res) => {
  try {
    if (req.tenant._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Forbidden: Not your tenant" });
    }

    // 🔑 Check user role inside tenant
    const membership = req.tenant.users.find(
      (u) => u.user.toString() === req.user._id.toString()
    );

    if (!membership) {
      return res.status(403).json({ message: "Forbidden: Not a member" });
    }

    if (!["Owner", "Admin"].includes(membership.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    // ✅ Allowed → update tenant
    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("users");

    res.json({ message: "Tenant updated", tenant: updatedTenant });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ✅ Delete current tenant (only Owner should do this)
TenantsRouter.delete("/:id", tenantMiddleware, async (req, res) => {
  try {
    if (req.tenant._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Forbidden: Not your tenant" });
    }

    await Tenant.findByIdAndDelete(req.params.id);
    res.json({ message: "Tenant deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
