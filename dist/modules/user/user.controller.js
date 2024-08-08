import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { userService } from "./user.service.js";
import { UserRole, UserStatus } from "./user.enum.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { ObjectId } from "../../constants/type.js";
const userSignUp = errorWrapper(async (req, res, next) => {
  const data = await userService.userSignUp({
    ...req.body,
    role: UserRole.USER,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const userSignIn = errorWrapper(async (req, res, next) => {
  const data = await userService.userSignIn({
    ...req.body,
    role: UserRole.USER,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const authorSignUp = errorWrapper(async (req, res, next) => {
  const data = await userService.userSignUp({
    ...req.body,
    role: UserRole.AUTHOR,
  });
  return responseUtils.success(res, {
    data,
    status: 201,
  });
});
const authorSignIn = errorWrapper(async (req, res, next) => {
  const data = await userService.userSignIn({
    ...req.body,
    role: UserRole.AUTHOR,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const adminSignIn = errorWrapper(async (req, res, next) => {
  const data = await userService.userSignIn({
    ...req.body,
    role: UserRole.ADMIN,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updateUser = errorWrapper(async (req, res, next) => {
  const data = await userService.updateUser(req?.user?._id, {
    ...req.body,
    role: UserRole.USER,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const followUnfollowUser = errorWrapper(async (req, res, next) => {
  const data = await userService.updateUser(req?.user?._id, {
    ...req.body,
    role: req?.user?.role,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updateAuthor = errorWrapper(async (req, res, next) => {
  const data = await userService.updateUser(req?.user?._id, {
    ...req.body,
    role: UserRole.AUTHOR,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updateUserByAdmin = errorWrapper(async (req, res, next) => {
  const data = await userService.updateUserByAdmin(req?.params?.id);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const forgotPassword = errorWrapper(async (req, res, next) => {
  const data = await userService.forgotPassword(req?.body);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const updatePassword = errorWrapper(async (req, res, next) => {
  const data = await userService.updatePassword(req.body);
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const findUserById = errorWrapper(async (req, res, next) => {
  const data = await userService.findUserById({
    userId: req.user?._id,
    isFollowing: true,
    isFollowers: true,
    isProfile: true,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const findUserByParamId = errorWrapper(async (req, res, next) => {
  const data = await userService.findUserById({
    userId: req.params?.id,
    isFollowing: true,
    isFollowers: true,
    isProfile: false,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const getAllUsers = errorWrapper(async (req, res, next) => {
  const paginationOptions = getPaginationOptions({
    limit: req.query?.limit,
    page: req.query?.page,
  });
  const data = await userService.getAllUsers({
    query: {
      isDeleted: false,
      role: { $ne: UserRole.ADMIN },
      status: UserStatus.ACTIVE,
      _id: { $ne: new ObjectId(req?.user?._id) },
    },
    options: {
      sort: { createdBy: -1 },
      ...paginationOptions,
    },
    userId: req?.user?._id,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
const findAvailableUsersForChat = errorWrapper(async (req, res, next) => {
  let filterQuery = {
    isDeleted: false,
    status: UserStatus.ACTIVE,
  };
  const searchTerm = req.query?.searchTerm;
  if (searchTerm) {
    filterQuery = {
      ...filterQuery,
      $or: [
        {
          firstName: {
            $regex: new RegExp(String(searchTerm)),
            $options: "i",
          },
        },
        {
          lastName: { $regex: new RegExp(String(searchTerm)), $options: "i" },
        },
      ],
    };
  }
  const data = await userService.findAvailableUsersForChat({
    query: {
      isDeleted: false,
      status: UserStatus.ACTIVE,
      _id: new ObjectId(req?.user?._id),
    },
    filterQuery,
  });
  return responseUtils.success(res, {
    data,
    status: 200,
  });
});
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
  updateAuthor,
  followUnfollowUser,
  getAllUsers,
  findAvailableUsersForChat,
  findUserByParamId,
};
