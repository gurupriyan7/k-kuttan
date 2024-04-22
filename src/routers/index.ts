/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import userRouter from "./user/user.router.js";
import { healthCheck } from "../controller/app.controller.js";
import postRouter from "./posts/posts.router.js";
import paymentRouter from "./payment/payment.router.js";

const router = Router();

router.get("/", healthCheck);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/payment", paymentRouter);

export default router;
