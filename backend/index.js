import express from "express";
import dotenv from "dotenv";
import { DBconnection } from "./lib/db.js";
import { authRoutes } from "./routes/authRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ACRRoutes } from "./routes/ACR.Routes.js";
import { TenantsRouter } from "./routes/tenants.Routes.js";
import { userRoutes } from "./routes/userRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true, // allow cookies
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ACR", ACRRoutes);
app.use("/api/tenent", TenantsRouter);
app.use("/api/users", userRoutes);

// Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  DBconnection();
  console.log(`🚀 Server started on port ${PORT}`);
});
