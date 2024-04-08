import { ObjectId } from "../../constants/type.js";
import { Schema, model } from "mongoose";

const PartsSchema = new Schema(
  {
    name: String,
    part_no: Number,
    categoryId: {
      type: ObjectId,
      ref: "categories",
    },
    areaId: {
      type: ObjectId,
      ref: "areas",
    },
    subCategory: [
      {
        title: String,
        questionGroupId: {
          type: ObjectId,
          ref: "question_groups",
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Parts = model("parts", PartsSchema);

export default Parts;
