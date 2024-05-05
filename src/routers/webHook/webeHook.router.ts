/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { paymentWebhook } from "../../modules/payment/payment.controller.js";

const router = Router();

router.post("/", paymentWebhook);

export default router;
