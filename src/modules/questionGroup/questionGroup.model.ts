import { Schema, model } from "mongoose";
import { ObjectId } from "../../constants/type.js";

const QuestionGroupSchema = new Schema(
  {
    categoryId: {
      type: ObjectId,
      ref: "categories",
    },
    areaId: {
      type: ObjectId,
      ref: "areas",
    },
    questions: {
      type: [ObjectId],
      ref: "questions",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const QuestionGroup = model("question_groups", QuestionGroupSchema);

export default QuestionGroup;
