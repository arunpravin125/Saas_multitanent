import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
    role: {
      type: String,
      enum: ["Owner", "Admin", "Manager", "Employee", "Viewer"],
      default: "Employee",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
