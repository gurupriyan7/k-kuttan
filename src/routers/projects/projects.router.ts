/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getUserProjects,
  getProjectId,
  approveOrRejectProject,
} from "../../modules/projects/projects.controller.js";
import JoiValidator from "../../middleware/joi.middleware.js";
import { addProjectSchema } from "../../modules/projects/projects.joi.js";

import { protect } from "../../middleware/auth.middleware.js";
import { UserRole } from "../../modules/user/user.enum.js";

const router = Router();

router.post(
  "/",
  protect([UserRole.USER]),
  JoiValidator(addProjectSchema),
  createProject,
);
router.get("/admin", protect([UserRole.ADMIN]), getAllProjects);
router.get("/user", protect([UserRole.USER]), getUserProjects);
router.get("/:id", protect([UserRole.USER, UserRole.ADMIN]), getProjectId);
router.put("/:id/:action", protect([UserRole.ADMIN]), approveOrRejectProject);

export default router;
