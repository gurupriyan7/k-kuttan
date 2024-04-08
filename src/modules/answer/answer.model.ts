import { ObjectId } from "../../constants/type.js";
import { Schema, model } from "mongoose";

const AnswerSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "users",
    },
    questionGroupId: {
      type: ObjectId,
      ref: "question_groups",
    },
    partId: {
      type: ObjectId,
      ref: "parts",
    },
    subCategory: String,
    response: {
      type: [
        {
          questionId: {
            type: ObjectId,
            ref: "questions",
          },
          optionId: {
            type: ObjectId,
          },
        },
      ],
    },
  },
  { timestamps: true },
);

const Answer = model("answers", AnswerSchema);

export default Answer;
