import { Schema, model } from "mongoose";
import { ObjectId } from "../../constants/type.js";

const AreaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  categoryId: {
    type: ObjectId,
    ref: "categories",
  },
  description: String,
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const Area = model("areas", AreaSchema);

export default Area;
