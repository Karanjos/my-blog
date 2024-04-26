import express from "express";
const router = express.Router();

// Import admin routes
import adminRoutes from "./api/adminRoutes.js";
// Import recruiter routes
import recruiterRoutes from "./api/recruiterRoutes.js";
// Import user routes
import userRoutes from "./api/userRoutes.js";

// Mount routes
router.use("/admin", adminRoutes);
router.use("/recruiter", recruiterRoutes);
router.use("/users", userRoutes);

export default router;