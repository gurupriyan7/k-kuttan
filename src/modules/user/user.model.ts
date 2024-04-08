import { Schema, model } from "mongoose";
import { UserRole, UserStatus } from "./user.enum.js";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    // phoneNumber: {
    //   type: String,
    //   unique: true,
    //   sparse: true,
    //   trim: true,
    // },
    password: {
      type: String,
      minlength: 6,
    },
    status: {
      type: String,
      enum: UserStatus,
      default: UserStatus.ACTIVE,
    },
    org: {
      type: String,
    },
    position: {
      type: String,
    },
    industry: {
      type: String,
    },
    country: {
      type: String,
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

const User = model("user", UserSchema);

export default User;
