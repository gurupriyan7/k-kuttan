import { Response, NextFunction } from "express";

import { RequestWithUser } from "../../interface/app.interface.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { questionService } from "./question.service.js";

const createQuestion = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await questionService.createQuestions(req.body);

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

export { createQuestion };
