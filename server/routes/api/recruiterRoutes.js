import express from "express";
const router = express.Router();
import {createRecruiter} from "../../controllers/recruiterController.js";

// Recruiter routes (e.g., /api/recruiters)
router.post("/register", createRecruiter);
// router.post("/login", recruiterController.loginRecruiter);
// router.get("/", recruiterController.getRecruiters);
// router.get("/:id", recruiterController.getRecruiter);
// router.put("/:id", recruiterController.updateRecruiter);
// router.delete("/:id", recruiterController.deleteRecruiter);

// //reset password
// router.post("/forgotpassword", recruiterController.forgotPassword);
// router.post("/resetpassword/:resetToken", recruiterController.resetPassword);

// Add other recruiter-specific routes

export default router;