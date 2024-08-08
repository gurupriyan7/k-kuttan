import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { roomService } from "./room.service.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
const createRoom = errorWrapper(async (req, res, next) => {
  const data = await roomService.createRoom({
    name: req.body?.name,
    admin: req.user?._id,
    ...(req.body?.members && {
      members: req.body?.members,
    }),
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const getAllRooms = errorWrapper(async (req, res, next) => {
  const paginationOptions = getPaginationOptions({
    limit: req.query?.limit,
    page: req.query?.page,
  });
  const data = await roomService.getAllRooms({
    query: {
      isDeleted: false,
    },
    options: {
      ...paginationOptions,
    },
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const joinRoom = errorWrapper(async (req, res, next) => {
  const data = await roomService.joinRoom({
    roomId: req?.params?.id,
    userId: req.user?._id,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const leaveRoom = errorWrapper(async (req, res, next) => {
  const data = await roomService.leaveRoom({
    roomId: req?.params?.id,
    userId: req.user?._id,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getUserRooms = errorWrapper(async (req, res, next) => {
  const paginationOptions = getPaginationOptions({
    limit: req.query?.limit,
    page: req.query?.page,
  });
  const data = await roomService.getAllRooms({
    query: {
      members: { $in: [req.user?._id] },
      isDeleted: false,
    },
    options: {
      ...paginationOptions,
    },
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const deleteRoom = errorWrapper(async (req, res, next) => {
  const data = await roomService.deleteRoom(req?.params?.id);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
export {
  createRoom,
  getAllRooms,
  joinRoom,
  leaveRoom,
  getUserRooms,
  deleteRoom,
};
