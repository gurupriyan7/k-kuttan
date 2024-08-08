/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  userSignIn,
  userSignUp,
  forgotPassword,
  updatePassword,
  adminSignIn,
  authorSignIn,
  authorSignUp,
  updateUser,
  findUserById,
  updateAuthor,
  followUnfollowUser,
  getAllUsers,
  findAvailableUsersForChat,
  findUserByParamId,
} from "../../modules/user/user.controller.js";
import JoiValidator from "../../middleware/joi.middleware.js";
import {
  forGotPasswordLinkSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} from "../../modules/user/user.joi.js";
import { protect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";
const router = Router();
// user-endpoints
router.get(
  "/",
  protect([UserRole.ADMIN, UserRole.AUTHOR, UserRole.USER]),
  findUserById,
);
router.get(
  "/all",
  protect([UserRole.ADMIN, UserRole.AUTHOR, UserRole.USER]),
  getAllUsers,
);
router.get(
  "/all-chat",
  protect([UserRole.ADMIN, UserRole.AUTHOR, UserRole.USER]),
  findAvailableUsersForChat,
);
router.get("/:id", findUserByParamId);
router.post("/", JoiValidator(signupSchema), userSignUp);
router.post("/login", JoiValidator(loginSchema), userSignIn);
router.post("/admin/login", JoiValidator(loginSchema), adminSignIn);
router.post("/author", JoiValidator(signupSchema), authorSignUp);
router.post("/author/login", JoiValidator(loginSchema), authorSignIn);
router.patch("/", protect([UserRole.ADMIN, UserRole.USER]), updateUser);
router.patch(
  "/author",
  protect([UserRole.ADMIN, UserRole.AUTHOR]),
  updateAuthor,
);
router.patch("/admin/:id", protect([UserRole.ADMIN]), updateUser);
router.patch(
  "/:id",
  protect([UserRole.ADMIN, UserRole.AUTHOR, UserRole.USER]),
  followUnfollowUser,
);
router.post(
  "/forgot-password",
  JoiValidator(forGotPasswordLinkSchema),
  forgotPassword,
);
router.post(
  "/reset-password",
  JoiValidator(resetPasswordSchema),
  updatePassword,
);
export default router;
