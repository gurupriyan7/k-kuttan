import { generateAPIError } from "../../errors/apiError.js";
import { ObjectId } from "../../constants/type.js";
import Room from "./room.model.js";
import { errorMessages } from "../../constants/messages.js";

const createRoom = async (roomData: any): Promise<any> => {
  return await Room.create(roomData);
};

const getAllRooms = async ({
  query = {},
  options,
}: any): Promise<{ data: any[]; totalCount: number }> => {
  const [data, totalCount] = await Promise.all([
    Room.find(query, {}, options)
      .populate({
        path: "admin",
        select: "firstName profileImage lastName",
      })
      .populate({
        path: "members",
        select: "firstName profileImage lastName",
      }),
    Room.countDocuments(query),
  ]);

  return { data, totalCount };
};

const joinRoom = async (joinRoomData: any): Promise<any> => {
  const { userId, roomId } = joinRoomData;

  const isUserJoined = await Room.findOne({
    _id: new ObjectId(roomId),
    members: { $in: [new ObjectId(userId)] },
    isDeleted: false,
  });

  if (isUserJoined != null) {
    return await generateAPIError(errorMessages.userAlreadyJoined, 400);
  }

  return await Room.findOneAndUpdate(
    {
      _id: new ObjectId(roomId),
      isDeleted: false,
    },
    {
      $push: { members: userId },
    },
  );
};
const leaveRoom = async (joinRoomData: any): Promise<any> => {
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

const deleteRoom = async (roomId: string): Promise<any> => {
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
