import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../interface/app.interface.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { paymentService } from "./payment.service.js";

const createPayment = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await paymentService.createPaymentHistory({
      ...req.body,
      userId: req.user?._id,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const paymentWebhook = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await paymentService.paymentWebhook(req.body);

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export { createPayment, paymentWebhook };
