import { Response, NextFunction } from "express";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { RequestWithUser } from "../../interface/app.interface.js";
import { messageService } from "./message.service.js";
import { ObjectId } from "../../constants/type.js";

const addMessage = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const { chatId, text } = req.body;

    const data = await messageService.addMessage({
      chatId,
      text,
      senderId: req.user?._id as string,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const findMessages = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log(req);

    const data = await messageService.findMessages({
      query: {
        chatId: new ObjectId(req.params?.id),
        isDeleted: false,
      },
      options: {
        sort: { createdBy: -1 },
      },
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export { addMessage, findMessages };
