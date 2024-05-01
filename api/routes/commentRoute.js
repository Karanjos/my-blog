import express from "express";
import {
  createComment,
  editComment,
  getPostComments,
  likeComment,
  deleteComment,
  getComments,
} from "../controllers/commentController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.get("/getpostcomments/:postId", getPostComments);
router.put("/likecomment/:commentId", verifyToken, likeComment);
router.put("/editcomment/:commentId", verifyToken, editComment);
router.delete("/deletecomment/:commentId", verifyToken, deleteComment);
router.get("/getcomments",verifyToken, getComments)

export default router;
