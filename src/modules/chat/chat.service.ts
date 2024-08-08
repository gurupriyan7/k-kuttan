import { FilterQuery } from "mongoose";
import Chat from "./chat.model.js";
import { ChatData } from "./chat.interface.js";

const createChat = async (chatData: ChatData): Promise<any> => {
  console.log(chatData, "chatData---");

  const { members, isRoom = false } = chatData;
  const chatExists = await Chat.findOne({
    members: { $all: members },
    isRoom,
  });

  console.log(members, "members");

  if (chatExists) {
    return chatExists;
  }
  return await Chat.create(chatData);
};

const findChat = async (query: FilterQuery<typeof Chat>): Promise<any> => {
  console.log(query, "query");

  return await Chat.findOne(query).populate({
    path: "members",
    select: "firstName profileImage lastName userName",
  });
};
const findUserChats = async (query: FilterQuery<typeof Chat>): Promise<any> => {
  return await Chat.find(query).populate({
    path: "members",
    select: "firstName profileImage lastName userName",
  });
};

export const chatService = {
  createChat,
  findChat,
  findUserChats,
};
