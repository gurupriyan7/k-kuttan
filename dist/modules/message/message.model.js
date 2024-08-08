import { ObjectId } from "../../constants/type.js";
import { model, Schema } from "mongoose";
const MessageSchema = new Schema(
  {
    chatId: {
      type: ObjectId,
      ref: "chats",
    },
    senderId: {
      type: ObjectId,
      ref: "users",
    },
    text: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
const Messages = model("Messages", MessageSchema);
export default Messages;
