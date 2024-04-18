/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  userSignIn,
  userSignUp,
  updateAdmin,
  forgotPassword,
  updatePassword,
  adminSignIn,
  authorSignIn,
  authorSignUp,
  updateUser,
} from "../../modules/user/user.controller.js";
import JoiValidator from "../../middleware/joi.middleware.js";
import {
  forGotPasswordLinkSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  updateAdminSchema,
  updateUserSchema,
} from "../../modules/user/user.joi.js";

import { protect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";

const router = Router();

// user-endpoints
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

router.patch(
  "/admin/:id",
  protect([UserRole.ADMIN]),
  JoiValidator(updateAdminSchema),
  updateAdmin,
);

export default router;
