import express from "express";
const router = express.Router();
import { register, login, logout } from "../../controllers/userController.js";

import { isAuthenticatedUser } from "../../middleware/auth.js";

// User routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticatedUser, logout);
// router.get("/me", isAuthenticatedUser, userController.getUserProfile);
// router.put("/update", isAuthenticatedUser, userController.updateProfile);
// router.put(
//   "/update/password",
//   isAuthenticatedUser,
//   userController.updatePassword
// );

// //reset password
// router.post("/forgotpassword", userController.forgotPassword);
// router.post("/resetpassword/:resetToken", userController.resetPassword);

// Add other user-specific routes

export default router;
