import { Router } from "express";
import userRouter from "./user/user.router.js";
import projectRouter from "./projects/projects.router.js";
import categoryRouter from "./categories/categories.router.js";
import questionRouter from "./question/question.router.js";
import areaRouter from "./areas/areas.router.js";
import { healthCheck } from "../controller/app.controller.js";

const router = Router();

router.get("/", healthCheck);
router.use("/user", userRouter);
router.use("/projects", projectRouter);
router.use("/categories", categoryRouter);
router.use("/question", questionRouter);
router.use("/area", areaRouter);

export default router;
