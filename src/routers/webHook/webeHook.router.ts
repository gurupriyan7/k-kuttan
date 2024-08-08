/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { paymentWebhook } from "../../modules/payment/payment.controller.js";
import { protect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";

const router = Router();

router.post(
  "/",
  protect([UserRole.ADMIN, UserRole.AUTHOR, UserRole.USER]),
  paymentWebhook,
);

export default router;
