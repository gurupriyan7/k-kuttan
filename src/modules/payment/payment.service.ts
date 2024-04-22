import { PaymentData } from "./payment.interface.js";
import PaymentTransaction from "./payment.model.js";
import { PaymentDocument } from "./payment.types.js";

const createPaymentHistory = async (
  paymentData: PaymentData,
): Promise<PaymentDocument> => {
  return await PaymentTransaction.create(paymentData);
};

export const paymentService = {
  createPaymentHistory,
};
