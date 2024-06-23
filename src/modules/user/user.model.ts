import { Schema, model } from "mongoose";
import { UserApprovalStatus, UserRole, UserStatus } from "./user.enum.js";
import { ObjectId } from "../../constants/type.js";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    userName: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      set: (value: string) => value.toLowerCase(),
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.USER,
    },
    phoneNumber: {
      type: String,
      sparse: true,
      trim: true,
    },
    password: {
      type: String,
      minlength: 4,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    },
    approvalStatus: {
      type: String,
      enum: UserApprovalStatus,
      default: UserApprovalStatus.PENDING,
    },
    savedPosts: {
      type: [ObjectId],
      ref: "posts",
    },
    followings: {
      type: [ObjectId],
      ref: "users",
    },
    followers: {
      type: [ObjectId],
      ref: "users",
    },

    followingAuthors: {
      type: [ObjectId],
      ref: "users",
    },
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    Groups: {
      type: [ObjectId],
    },

    resetId: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

UserSchema.pre("save", function (next) {
  if (this.role === UserRole.USER) {
    this.status = UserStatus.ACTIVE;
  }
  next();
});

const User = model("users", UserSchema);

export default User;
