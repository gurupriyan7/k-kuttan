import { Schema, model } from "mongoose";
import { ObjectId } from "../../constants/type.js";
const ChatSchema = new Schema(
  {
    members: {
      type: [ObjectId],
      ref: "users",
    },
    isRoom: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
const Chat = model("Chats", ChatSchema);
export default Chat;
