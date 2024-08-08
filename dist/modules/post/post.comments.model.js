import { ObjectId } from "../../constants/type.js";
import { model, Schema } from "mongoose";
import { CommentType } from "./post.enum.js";
const CommentSchema = new Schema(
  {
    comment: String,
    userId: {
      type: ObjectId,
      ref: "users",
    },
    postId: {
      type: ObjectId,
      ref: "posts",
    },
    commentType: {
      type: String,
      enum: CommentType,
    },
    replyIds: {
      type: [ObjectId],
      ref: "comments",
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
const Comment = model("comments", CommentSchema);
export default Comment;
