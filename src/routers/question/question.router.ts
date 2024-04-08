import { Router } from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { createQuestion } from "../../modules/question/question.controller.js";
import {
  createQuestionResponse,
  getAllUserResponses,
} from "../../modules/answer/answer.controller.js";
import { getQuestionGroup } from "../../modules/questionGroup/questionGroup.controller.js";

const router = Router();

router.post("/", protect(), createQuestion);
router.post("/response", protect(), createQuestionResponse);
router.get("/response", protect(), getAllUserResponses);
router.get("/group/:id", protect(), getQuestionGroup);

export default router;
