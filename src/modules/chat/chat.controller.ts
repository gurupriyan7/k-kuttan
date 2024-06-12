import { Response, NextFunction } from "express";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { chatService } from "./chat.service.js";
import { RequestWithUser } from "../../interface/app.interface.js";

const createChat = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await chatService.createChat({
      members: [req.user?._id as string, req.body?.memberId],
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

const findChat = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await chatService.findChat({
      members: { $all: [req.user?._id, req.query?.id] },
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const findUserChats = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await chatService.findUserChats({
      members: { $in: [req.user?._id] },
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export { createChat, findChat, findUserChats };
