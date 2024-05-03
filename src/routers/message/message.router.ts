/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";
import {
  addMessage,
  findMessages,
} from "../../modules/message/message.controller.js";

const router = Router();
router.post(
  "/",
  protect([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
  addMessage,
);
router.get(
  "/:id",
  protect([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
  findMessages,
);

export default router;
