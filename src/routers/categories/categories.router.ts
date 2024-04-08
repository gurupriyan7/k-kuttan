import { Router } from "express";
import {
  createCategories,
  getAllCategories,
} from "../../modules/categories/categories.controller.js";

const router = Router();

router.post("/", createCategories);
router.get("/", getAllCategories);

export default router;
