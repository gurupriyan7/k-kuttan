import { Response, Request, NextFunction } from "express";

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { userService } from "./user.service.js";
import { UserRole } from "./user.enum.js";
import { RequestWithUser } from "../../interface/app.interface.js";
// import { FilterQuery } from 'mongoose'
// import User from './user.model.js'
// import { ObjectId } from '../../constants/type.js'
// import { getPaginationOptions } from '../../utils/pagination.utils.js'

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
      role: UserRole.USER,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const authorSignUp = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userService.userSignUp({
      ...req.body,
      role: UserRole.AUTHOR,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

const authorSignIn = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userService.userSignIn({
      ...req.body,
      role: UserRole.AUTHOR,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const adminSignIn = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await userService.userSignIn({
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
const updateUserByAdmin = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await userService.updateUserByAdmin(req?.params?.id);

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

const findUserById = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await userService.findUserById(req.user?._id as string);

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export {
  userSignUp,
  userSignIn,
  adminSignIn,
  authorSignUp,
  authorSignIn,
  updateUser,
  forgotPassword,
  updatePassword,
  updateUserByAdmin,
  findUserById,
};
