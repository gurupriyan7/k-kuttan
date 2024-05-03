/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import userRouter from "./user/user.router.js";
import { healthCheck } from "../controller/app.controller.js";
import postRouter from "./posts/posts.router.js";
import paymentRouter from "./payment/payment.router.js";
import { getS3Urls } from "../controller/s3.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import chatRouter from "./chat/chat.router.js";
import messageRouter from "./message/message.router.js";
import roomRouter from "./room/room.router.js";

const router = Router();
router.post("/s3url", protect(), getS3Urls);

router.get("/", healthCheck);
router.use("/user", userRouter);
router.use("/post", postRouter);
router.use("/payment", paymentRouter);
router.use("/chat", chatRouter);
router.use("/message", messageRouter);
router.use("/room", roomRouter);

export default router;
