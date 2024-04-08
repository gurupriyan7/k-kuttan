import { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    portfolioSize: {
      type: String,
    },
    portfolioCategory: {
      type: String,
    },
    portfolioAge: {
      type: String,
    },
    status: {
      type: Boolean, // false will be pending and true will be approved
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    answerId: {
      type: Schema.Types.ObjectId,
      ref: "answers",
    },
    assignedMaturity: [
      {
        area: {
          type: String,
        },
        maturity: {
          type: String,
        },
        remarks: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true },
);

const Project = model("projects", ProjectSchema);

export default Project;
