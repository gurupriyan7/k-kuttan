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
} from "../../modules/user/user.controller.js";
import JoiValidator from "../../middleware/joi.middleware.js";
import {
  forGotPasswordLinkSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  updateUserSchema,
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
router.post("/", JoiValidator(signupSchema), userSignUp);
router.post("/login", JoiValidator(loginSchema), userSignIn);
router.post("/admin/login", JoiValidator(loginSchema), adminSignIn);
router.post("/author", JoiValidator(signupSchema), authorSignUp);
router.post("/author/login", JoiValidator(loginSchema), authorSignIn);
router.patch(
  "/",
  protect([UserRole.ADMIN, UserRole.AUTHOR, UserRole.USER]),
  JoiValidator(updateUserSchema),
  updateUser,
);
router.patch("/:id", protect([UserRole.ADMIN]), updateUser);

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
