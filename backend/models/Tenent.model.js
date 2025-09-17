import mongoose from "mongoose";

const tenantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tenantCode: { type: String, required: true, unique: true },
    users: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["Owner", "Admin", "Member"],
          default: "Member",
        },
      },
    ],
  },
  { timestamps: true }
);

export const Tenant = mongoose.model("Tenant", tenantSchema);
