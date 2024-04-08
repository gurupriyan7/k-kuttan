import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { getAreaByCategory } from "../../modules/areas/area.controller.js";

const router = Router();

router.get("/:id", protect(), getAreaByCategory);

export default router;
