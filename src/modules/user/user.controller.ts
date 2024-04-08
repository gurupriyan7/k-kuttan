import { Response, Request, NextFunction } from "express";

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { userService } from "./user.service.js";
import { UserRole } from "./user.enum.js";
import { RequestWithUser } from "../../interface/app.interface.js";
import { FilterQuery } from "mongoose";
import User from "./user.model.js";
// import { ObjectId } from '../../constants/type.js'
import { getPaginationOptions } from "../../utils/pagination.utils.js";

const userSignUp = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userService.userSignUp({
      ...req.body,
      role: UserRole.USER,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

const userSignIn = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userService.userSignIn({
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const addAdmin = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await userService.addAdmin({
      ...req.body,
      role: req?.user?.role,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const adminSignIn = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userService.adminSignIn({
      ...req.body,
      role: UserRole.ADMIN,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const updateUser = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await userService.updateUser(req?.user?._id as string, {
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const updateAdmin = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await userService.updateAdmin(
      req.params?.id,
      req.body?.status,
    );

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const getAllAdmins = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const query: FilterQuery<typeof User> = {
      isDeleted: false,
      role: UserRole.ADMIN,
    };

    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    const data = await userService.getAllAdmins({
      query,
      options: {
        ...paginationOptions,
        sort: { createdAt: 1 },
        select: "-password",
      },
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const forgotPassword = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userService.forgotPassword(req.body.email);

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const updatePassword = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userService.updatePassword(req.body);

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export {
  userSignUp,
  userSignIn,
  addAdmin,
  adminSignIn,
  updateUser,
  updateAdmin,
  getAllAdmins,
  forgotPassword,
  updatePassword,
};
