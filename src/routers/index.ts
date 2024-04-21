/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import userRouter from "./user/user.router.js";
import { healthCheck } from "../controller/app.controller.js";
import postRouter from "./posts/posts.router.js";

const router = Router();

router.get("/", healthCheck);
router.use("/user", userRouter);
router.use("/post", postRouter);

export default router;
