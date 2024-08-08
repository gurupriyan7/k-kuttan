import { generateAPIError } from "../../errors/apiError.js";
import { ObjectId } from "../../constants/type.js";
import Chat from "../../modules/chat/chat.model.js";
import Messages from "./message.model.js";
import { errorMessages } from "../../constants/messages.js";
const addMessage = async (messageData) => {
  const { chatId } = messageData;
  console.log(messageData, "messageData");
  const chat = await Chat.findOne({
    _id: new ObjectId(chatId),
    // members: { $in: [new ObjectId(senderId)] },
  });
  console.log(chat, "chatttt--------------");
  if (chat == null) {
    return await generateAPIError(errorMessages.chatNotFount, 400);
  }
  return await Messages.create(messageData);
};
const findMessages = async ({ query = {}, options }) => {
  // const [data, totalCount] = await Promise.all([
  //   Messages.find(query, {}, options),
  //   Messages.countDocuments(query),
  // ]);
  // return { data, totalCount };
  return await Messages.find(query, {}, options).populate({
    path: "senderId",
    select: "firstName profileImage lastName userName",
  });
};
export const messageService = {
  addMessage,
  findMessages,
};
