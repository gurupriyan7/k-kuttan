import { Response, NextFunction } from "express";

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { RequestWithUser } from "../../interface/app.interface.js";
import { questionResponseService } from "./answer.service.js";

const createQuestionResponse = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await questionResponseService.createQuestionResponse({
      ...req.body,
      userId: req?.user?._id,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const getAllUserResponses = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await questionResponseService.getAllUserResponses(
      req?.user?._id as string,
    );

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export { createQuestionResponse, getAllUserResponses };
