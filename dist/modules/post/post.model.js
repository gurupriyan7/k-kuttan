import { Schema, model } from "mongoose";
import { ObjectId } from "../../constants/type.js";
import { UserApprovalStatus } from "../../modules/user/user.enum.js";
import { PostCategoriesEnum, PostStatus, PostTag } from "./post.enum.js";
const PostSchema = new Schema(
  {
    image: {
      type: String,
    },
    summary: {
      type: String,
    },
    partName: {
      type: String,
    },
    partNumber: {
      type: Number,
      default: 1,
    },
    story: {
      type: [{ page: Number, story: String }],
    },
    title: {
      type: String,
    },
    likes: {
      type: [ObjectId],
      ref: "users",
    },
    comments: {
      type: [
        {
          comment: String,
          userId: {
            type: ObjectId,
            ref: "users",
          },
        },
      ],
    },
    commentIds: {
      type: [ObjectId],
    },
    createdBy: {
      type: ObjectId,
      ref: "users",
    },
    approvalStatus: {
      type: String,
      enum: UserApprovalStatus,
      default: UserApprovalStatus.PENDING,
    },
    status: {
      type: String,
      enum: PostStatus,
      default: PostStatus.ACTIVE,
    },
    isFree: {
      type: Boolean,
      default: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    isDraft: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      enum: PostCategoriesEnum,
      default: PostCategoriesEnum.COMMON,
    },
    tag: {
      type: String,
      enum: PostTag,
    },
    positionNumber: {
      type: Number,
      default: 0,
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
const Post = model("posts", PostSchema);
export default Post;
