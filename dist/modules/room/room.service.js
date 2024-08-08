import { generateAPIError } from "../../errors/apiError.js";
import { ObjectId } from "../../constants/type.js";
import Room from "./room.model.js";
import { errorMessages } from "../../constants/messages.js";
import Chat from "../../modules/chat/chat.model.js";
const createRoom = async (roomData) => {
  const chat = await Chat.create({
    members: roomData?.members,
    isRoom: true,
  });
  return await Room.create({
    ...roomData,
    chatId: chat?._id,
  });
};
const getAllRooms = async ({ query = {}, options }) => {
  return await Room.find(query, {}, options)
    .populate({
      path: "admin",
      select: "firstName profileImage lastName",
    })
    .populate({
      path: "members",
      select: "firstName profileImage lastName",
    });
  // .populate("chatId")
};
const joinRoom = async (joinRoomData) => {
  const { userId, roomId } = joinRoomData;
  const isUserJoined = await Room.findOne({
    _id: new ObjectId(roomId),
    members: { $in: [new ObjectId(userId)] },
    isDeleted: false,
  });
  if (isUserJoined != null) {
    return await generateAPIError(errorMessages.userAlreadyJoined, 400);
  }
  const data = await Room.findOneAndUpdate(
    {
      _id: new ObjectId(roomId),
      isDeleted: false,
    },
    {
      $push: { members: userId },
    },
    { new: true },
  );
  await Chat.findOneAndUpdate(
    {
      _id: new ObjectId(String(data?.chatId)),
    },
    {
      $push: { members: userId },
    },
    { new: true },
  );
  console.log(data, "join room");
  return data;
};
const leaveRoom = async (joinRoomData) => {
  const { userId, roomId } = joinRoomData;
  const isUserJoined = await Room.findOne({
    _id: new ObjectId(roomId),
    members: { $in: [new ObjectId(userId)] },
    isDeleted: false,
  });
  if (isUserJoined === null) {
    return await generateAPIError(errorMessages.userNotINTheGroup, 400);
  }
  return await Room.findOneAndUpdate(
    {
      _id: new ObjectId(roomId),
      isDeleted: false,
    },
    {
      $pull: { members: userId },
    },
  );
};
const deleteRoom = async (roomId) => {
  const room = await Room.findOne({
    _id: new ObjectId(roomId),
    isDeleted: false,
  });
  if (room === null) {
    return await generateAPIError(errorMessages.roomNotFound, 404);
  }
  return await Room.findOneAndUpdate(
    {
      _id: new ObjectId(roomId),
      isDeleted: false,
    },
    {
      isDeleted: true,
    },
  );
};
export const roomService = {
  createRoom,
  getAllRooms,
  joinRoom,
  leaveRoom,
  deleteRoom,
};
