import { ObjectId } from "../../constants/type.js";
import mongoose from "mongoose";

const PaymentTransactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
    },
    userId: {
      type: ObjectId,
      ref: "users",
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
    },
    postId: {
      type: ObjectId,
      ref: "posts",
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

const PaymentTransaction = mongoose.model(
  "payment_transactions",
  PaymentTransactionSchema,
);

export default PaymentTransaction;
