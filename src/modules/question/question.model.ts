import { Schema, model } from "mongoose";
import { QuestionType } from "./question.enum.js";
import { ObjectId } from "../../constants/type.js";

const QuestionSchema = new Schema(
  {
    questionText: {
      type: String,
    },
    type: {
      type: String,
      enum: QuestionType,
      required: true,
    },
    categoryId: {
      type: ObjectId,
      ref: "categories",
    },
    level: String,
    maxScore: Number,
    questionNo: {
      type: Number,
      required: true,
    },

    options: {
      type: [
        {
          option: String,
          value: String,
        },
      ],
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

const Question = model("questions", QuestionSchema);

export default Question;
