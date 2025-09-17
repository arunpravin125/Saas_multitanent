import express from "express";
import { protectRoutes } from "../middleware/protectRoute.js";
import { CreateACR } from "../models/CreateACR.model.js";
import { Tenant } from "../models/Tenent.model.js";
import { requireRole } from "../middleware/helperRoutes.js";
import { tenantMiddleware } from "../middleware/tenantMiddleware.js";

export const ACRRoutes = express.Router();

// Protect all routes

ACRRoutes.use(tenantMiddleware);

// ✅ Create new Change Request
ACRRoutes.post("/change", protectRoutes, async (req, res) => {
  try {
    const newCR = new CreateACR({
      ...req.body,
      tenantId: req.tenantId, // enforce tenant isolation
    });
    const savedCR = await newCR.save();
    res.status(201).json(savedCR);
  } catch (err) {
    console.log("error in Create new Change Request", err);
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all Change Requests (tenant filtered)
ACRRoutes.get("/", protectRoutes, async (req, res) => {
  try {
    const changeRequests = await CreateACR.find({ tenantId: req.tenantId });
    res.json(changeRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Only Owner or Admin can CREATE an ACR
ACRRoutes.post(
  "/",
  protectRoutes,
  requireRole("Owner", "Admin"),
  async (req, res) => {
    try {
      const newCR = new CreateACR({
        ...req.body,
        tenantId: req.tenantId,
      });
      const savedCR = await newCR.save();
      res.status(201).json(savedCR);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

// Everyone (Owner, Admin, Member) can READ
ACRRoutes.get(
  "/",
  requireRole("Owner", "Admin", "Member"),
  async (req, res) => {
    try {
      const changeRequests = await CreateACR.find({ tenantId: req.tenantId });
      res.json(changeRequests);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

// ✅ Get single Change Request by ID (tenant safe)
ACRRoutes.get("/:id", protectRoutes, async (req, res) => {
  try {
    const changeRequest = await CreateACR.findOne({
      _id: req.params.id,
      tenantId: req.tenantId,
    });
    if (!changeRequest) return res.status(404).json({ error: "Not found" });
    res.json(changeRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update Change Request (tenant safe)
ACRRoutes.put("/:id", protectRoutes, async (req, res) => {
  try {
    const updatedCR = await CreateACR.findOneAndUpdate(
      { _id: req.params.id, tenantId: req.tenantId },
      req.body,
      { new: true }
    );
    if (!updatedCR) return res.status(404).json({ error: "Not found" });
    res.json(updatedCR);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Only Owner can DELETE
ACRRoutes.delete(
  "/:id",
  protectRoutes,
  requireRole("Owner"),
  async (req, res) => {
    try {
      const deletedCR = await CreateACR.findOneAndDelete({
        _id: req.params.id,
        tenantId: req.tenantId,
      });
      if (!deletedCR) return res.status(404).json({ error: "Not found" });
      res.json({ message: "Change Request deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
