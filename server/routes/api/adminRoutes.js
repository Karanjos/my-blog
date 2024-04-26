import express from "express";
const router = express.Router();
import {createAdmin} from "../../controllers/adminController.js";

// Admin routes (e.g., /api/admins)
router.post("/register", createAdmin);
// router.post("/login", adminController.loginAdmin);
// router.get("/", adminController.getAdmins);
// router.get("/:id", adminController.getAdmin);
// router.put("/:id", adminController.updateAdmin);
// router.delete("/:id", adminController.deleteAdmin);

// //reset password
// router.post("/forgotpassword", adminController.forgotPassword);
// router.post("/resetpassword/:resetToken", adminController.resetPassword);

// Add other admin-specific routes

export default router;
