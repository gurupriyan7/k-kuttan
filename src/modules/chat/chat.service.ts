import { FilterQuery } from "mongoose";
import Chat from "./chat.model.js";
import { ChatData } from "./chat.interface.js";

const createChat = async (chatData: ChatData): Promise<any> => {
  return await Chat.create(chatData);
};

const findChat = async (query: FilterQuery<typeof Chat>): Promise<any> => {
  return await Chat.findOne(query).populate({
    path: "members",
    select: "firstName profileImage lastName",
  });
};

export const chatService = {
  createChat,
  findChat,
};
