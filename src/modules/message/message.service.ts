import { generateAPIError } from "../../errors/apiError.js";
import { ObjectId } from "../../constants/type.js";
import Chat from "../../modules/chat/chat.model.js";
import { MessageData } from "./message.interface.js";
import Messages from "./message.model.js";
import { errorMessages } from "../../constants/messages.js";

const addMessage = async (messageData: MessageData): Promise<any> => {
  const { chatId, senderId } = messageData;

  const chat = await Chat.findOne({
    _id: new ObjectId(chatId),
    members: { $in: [new ObjectId(senderId)] },
  });

  if (chat == null) {
    return await generateAPIError(errorMessages.chatNotFount, 400);
  }

  return await Messages.create(messageData);
};

const findMessages = async ({
  query = {},
  options,
}: any): Promise<{ data: any[]; totalCount: number }> => {
  const [data, totalCount] = await Promise.all([
    Messages.find(query, {}, options),
    Messages.countDocuments(query),
  ]);

  return { data, totalCount };
};

export const messageService = {
  addMessage,
  findMessages,
};
