/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";
import {
  createChat,
  findChat,
  findUserChats,
} from "../../modules/chat/chat.controller.js";

const router = Router();
router.post("/", protect([UserRole.ADMIN]), createChat);
router.get(
  "/",
  protect([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
  findUserChats,
);
router.get(
  "/:id",
  protect([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
  findChat,
);

export default router;
