/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";
import {
  createPost,
  getAllPosts,
  getAllPostsByUser,
  updatePost,
  updatePostLikeAndComment,
} from "../../modules/post/post.controller.js";

const router = Router();

router.post("/", protect([UserRole.AUTHOR, UserRole.ADMIN]), createPost);
router.get("/", getAllPosts);
router.get(
  "/user",
  protect([UserRole.AUTHOR, UserRole.ADMIN]),
  getAllPostsByUser,
);
router.patch("/:id", protect([UserRole.AUTHOR, UserRole.ADMIN]), updatePost);
router.patch(
  "/user/:id",
  protect([UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]),
  updatePostLikeAndComment,
);

export default router;
