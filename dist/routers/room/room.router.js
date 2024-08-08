/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getUserRooms,
  joinRoom,
  leaveRoom,
} from "../../modules/room/room.controller.js";
const router = Router();
router.post(
  "/",
  protect([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
  createRoom,
);
router.get(
  "/",
  protect([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
  getAllRooms,
);
router.get(
  "/user",
  protect([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
  getUserRooms,
);
router.patch(
  "/join/:id",
  protect([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
  joinRoom,
);
router.patch(
  "/leave/:id",
  protect([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
  leaveRoom,
);
router.patch(
  "/delete/:id",
  protect([UserRole.ADMIN, UserRole.USER, UserRole.AUTHOR]),
  deleteRoom,
);
export default router;
