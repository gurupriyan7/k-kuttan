/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { protect, optionalProtect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";
import {
  createPost,
  findPostById,
  findSequencePosts,
  getAllPosts,
  getAllPostsByUser,
  getAllPostsByUserId,
  getPostSequences,
  updatePost,
  updatePostLikeAndComment,
} from "../../modules/post/post.controller.js";

const router = Router();

router.post(
  "/",
  protect([UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]),
  createPost,
);
router.get(
  "/",
  optionalProtect([UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]),
  getAllPosts,
);
router.get(
  "/seq/:id",
  optionalProtect([UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]),
  findSequencePosts,
);
router.get(
  "/user",
  protect([UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]),
  getAllPostsByUser,
);
router.get(
  "/post-seq",
  protect([UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]),
  getPostSequences,
);
router.get(
  "/user/:id",
  optionalProtect([UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]),
  getAllPostsByUserId,
);
router.get(
  "/:id",
  optionalProtect([UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]),
  findPostById,
);
router.patch("/:id", protect([UserRole.AUTHOR, UserRole.ADMIN]), updatePost);
router.patch(
  "/user/:id",
  protect([UserRole.AUTHOR, UserRole.ADMIN, UserRole.USER]),
  updatePostLikeAndComment,
);
export default router;
