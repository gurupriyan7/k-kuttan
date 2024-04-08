/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  // adminSignIn,
  userSignIn,
  userSignUp,
  addAdmin,
  updateAdmin,
  getAllAdmins,
  forgotPassword,
  updatePassword,
} from "../../modules/user/user.controller.js";
import JoiValidator from "../../middleware/joi.middleware.js";
import {
  adminSignUpSchema,
  forGotPasswordLinkSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
  updateAdminSchema,
} from "../../modules/user/user.joi.js";

import { protect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";

const router = Router();

// user-endpoints
router.post("/", JoiValidator(signupSchema), userSignUp);
router.post("/login", JoiValidator(loginSchema), userSignIn);

//admin-endpoints
router.get("/admin", getAllAdmins);
router.post(
  "/admin",
  JoiValidator(adminSignUpSchema),
  protect([UserRole.ADMIN]),
  addAdmin,
);
// router.post("/admin/login", JoiValidator(loginSchema), adminSignIn);
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
