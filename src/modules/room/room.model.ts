import { Schema, model } from "mongoose";
import { ObjectId } from "../../constants/type.js";

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "Group name is required"],
    },
    admin: {
      type: ObjectId,
      ref: "users",
    },
    members: {
      type: [ObjectId],
      ref: "users",
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

const Room = model("rooms", RoomSchema);
export default Room;
