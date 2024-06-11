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
    story: {
      type: [{ page: Number, story: String }],
    },
    // story: {
    //   type: String,
    // },
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
    createdBy: {
      type: ObjectId,
      ref: "users",
    },
    approvalStatus: {
      type: String,
      enum: UserApprovalStatus,
      default: UserApprovalStatus.APPROVED,
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
      default: 0,
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
