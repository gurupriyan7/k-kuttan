import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { chatService } from "./chat.service.js";
import { ObjectId } from "../../constants/type.js";
const createChat = errorWrapper(async (req, res, next) => {
  const data = await chatService.createChat({
    members: [req.user?._id, req.body?.receiverId],
    ...(req?.body?.isRoom === "true" && {
      isRoom: req?.body?.isRoom,
    }),
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const findChat = errorWrapper(async (req, res, next) => {
  const isRoom = req?.query?.isRoom === "true";
  const data = await chatService.findChat({
    members: { $all: [req.user?._id, req.params?.id] },
    ...(isRoom && {
      isRoom: true,
    }),
    ...(!isRoom && {
      isRoom: false,
    }),
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const findChatById = errorWrapper(async (req, res, next) => {
  const isRoom = req?.query?.isRoom === "true";
  const data = await chatService.findChat({
    _id: new ObjectId(req?.params?.id),
    ...(isRoom && {
      isRoom: true,
    }),
    ...(!isRoom && {
      isRoom: false,
    }),
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const findUserChats = errorWrapper(async (req, res, next) => {
  const isRoom = req?.query?.isRoom === "true";
  const data = await chatService.findUserChats({
    members: { $in: [req.user?._id] },
    ...(isRoom && {
      isRoom: true,
    }),
    ...(!isRoom && {
      isRoom: false,
    }),
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export { createChat, findChat, findUserChats, findChatById };
