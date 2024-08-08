import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { messageService } from "./message.service.js";
import { ObjectId } from "../../constants/type.js";
const addMessage = errorWrapper(async (req, res, next) => {
  const { chatId, text } = req.body;
  const data = await messageService.addMessage({
    chatId,
    text,
    senderId: req.user?._id,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const findMessages = errorWrapper(async (req, res, next) => {
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
});
export { addMessage, findMessages };
