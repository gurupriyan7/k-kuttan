import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { paymentService } from "./payment.service.js";
const createPayment = errorWrapper(async (req, res, next) => {
  const data = await paymentService.createPaymentHistory({
    ...req.body,
    userId: req.user?._id,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const paymentWebhook = errorWrapper(async (req, res, next) => {
  const data = await paymentService.paymentWebhook({
    ...req.body,
    userId: req.user?._id,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
export { createPayment, paymentWebhook };
