import { Schema, model } from "mongoose";
import { ObjectId } from "../../constants/type.js";

const ChatSchema = new Schema(
  {
    members: {
      type: [ObjectId],
      ref: "users",
    },
  },
  {
    timestamps: true,
  },
);
ChatSchema.index({ members: 1 }, { unique: true });

const Chat = model("Chats", ChatSchema);
export default Chat;
