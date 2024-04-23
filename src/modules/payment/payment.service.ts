// import PaymentTransaction from "./payment.model.js";
import { PaymentDocument } from "./payment.types.js";
import { v4 as uuidv4 } from "uuid";
import Razorpay from "razorpay";
import Post from "../../modules/post/post.model.js";
import { ObjectId } from "../../constants/type.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import { appConfig } from "../../config/appConfig.js";

const razorpay = new Razorpay({
  key_id: appConfig.razorpayKeyId,
  key_secret: appConfig.razorpaySecret,
});

const createPaymentHistory = async ({
  postId,
  userId,
}: any): Promise<PaymentDocument | any> => {
  const postData = await Post.findOne({
    _id: new ObjectId(postId),
    isDeleted: false,
  });

  if (postData == null) {
    return await generateAPIError(errorMessages.postNotFount, 400);
  }
  console.log(postData, "postData");

  const options = {
    amount: postData?.amount ?? 0, // amount in paisa (e.g., 50000 for ₹500)
    currency: "INR",
    receipt: uuidv4(), // Generate a unique receipt ID
    payment_capture: 1, // Auto-capture after order creation
  };
  try {
    const order = await razorpay.orders.create(options);
    console.log(order, "order");
    return order;
  } catch (error) {
    console.log(error);
  }
  // return await PaymentTransaction.create(paymentData);
};

export const paymentService = {
  createPaymentHistory,
};
