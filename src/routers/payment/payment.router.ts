/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";
import { createPayment } from "../../modules/payment/payment.controller.js";

const router = Router();

router.post("/", protect([UserRole.USER, UserRole.ADMIN]), createPayment);

export default router;
