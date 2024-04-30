import express from "express";
import {
  updateUser,
  deleteUser,
  getUsers,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/getusers", verifyToken, getUsers);


export default router;
