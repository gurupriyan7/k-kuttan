import bcrypt from "bcryptjs";
import { UserDocument } from "./user.types.js";
import User from "./user.model.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages, successMessages } from "../../constants/messages.js";
import { hashValue } from "./user.utils.js";
import { UserRole, UserStatus } from "./user.enum.js";
import { generateToken } from "../../utils/auth.utils.js";
import {
  AdminData,
  GetAllAdminsData,
  UpdatePasswordData,
  UserLoginData,
  UserSignUpData,
} from "./user.interface.js";
import { ObjectId } from "../../constants/type.js";
import { getUuid, resetLinkEmailTemplate } from "../../utils/app.utils.js";
import { sendMailData } from "../../interface/app.interface.js";
import { sendEmail } from "../../utils/sendMail.js";

const userSignUp = async (
  userData: UserSignUpData,
): Promise<(UserDocument & { token: string }) | any> => {
  const {
    firstName,
    lastName,
    userName,
    password,
    email,
    role,
    phoneNumber,
    profileImage,
    coverImage,
  } = userData;

  const userExists = await User.findOne({
    email,
    role,
    isDeleted: false,
  });

  console.log(userExists, "user", userData);

  if (userExists != null) {
    return await generateAPIError(errorMessages.userExists, 400);
  }

  const hashedPassword = await hashValue(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    role,
    userName,
    phoneNumber,
    profileImage,
    coverImage,
    ...(profileImage != null && {
      profileImage,
    }),
    ...(coverImage != null && {
      coverImage,
    }),
    password: hashedPassword,
  });

  return {
    firstName: user?.firstName,
    lastName: user?.lastName,
    userName: user?.userName,
    email: user?.email,
    role: user?.role,
    status: user?.status,
    profileImage: user?.profileImage,
    token: await generateToken({
      id: String(user?._id),
    }),
  };
};

const userSignIn = async (
  userData: UserLoginData,
): Promise<(UserDocument & { token: string }) | any> => {
  const { email, password } = userData;

  const user: any = await User.findOne({
    email,
    isDeleted: false,
  });

  if (user == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  if (user?.status === UserStatus.INACTIVE) {
    return await generateAPIError(errorMessages.userAccountBlocked, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
  }

  // if (user?.role !== UserRole.USER) {
  //   return await generateAPIError(errorMessages.unauthorized, 401);
  // }

  const comparePassword = await bcrypt.compare(password, user.password ?? "");

  if (!comparePassword) {
    return await generateAPIError(errorMessages.invalidCredentials, 404); // changed from 401 to 404 to fix frontend issue with redirect to login page
  }

  return {
    firstName: user?.firstName,
    lastName: user?.lastName,
    userName: user?.userName,
    email: user?.email,
    role: user?.role,
    status: user?.status,
    profileImage: user?.profileImage,
    token: await generateToken({
      id: String(user?._id),
    }),
  };
};
const adminSignIn = async (
  userData: UserLoginData,
): Promise<(UserDocument & { token: string }) | any> => {
  const { email, password, role } = userData;

  const user: any = await User.findOne({
    email,
    role: role ?? UserRole.ADMIN,
    isDeleted: false,
  });

  if (user == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  if (user?.status !== UserStatus.ACTIVE) {
    return await generateAPIError(errorMessages.userAccountBlocked, 401);
  }

  if (user?.role !== UserRole.ADMIN) {
    return await generateAPIError(errorMessages.unauthorized, 401);
  }

  const comparePassword = await bcrypt.compare(password, user.password ?? "");

  if (!comparePassword) {
    return await generateAPIError(errorMessages.invalidCredentials, 401);
  }
  return {
    token: await generateToken({ id: user?._id }),
    ...{
      name: user?.name,
      email: user?.email,
      role: user?.role,
      status: user?.status,
    },
  };
};

const addAdmin = async (adminData: AdminData): Promise<any> => {
  const { email, password, name, role } = adminData;

  const adminExists = await User.findOne({
    email,
    role: role ?? UserRole.ADMIN,
    isDeleted: false,
  });

  if (adminExists != null) {
    return await generateAPIError(errorMessages.userExists, 400);
  }

  const hashedPassword = await hashValue(password, 10);

  return await User.create({
    name,
    email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  });
};

const updateUser = async (
  userId: string,
  userData: Partial<UserSignUpData>,
): Promise<any> => {
  return await User.findOneAndUpdate(
    {
      _id: new ObjectId(userId),
      isDeleted: false,
    },
    {
      ...userData,
    },
  );
};
const updateAdmin = async (adminId: string, status: string): Promise<any> => {
  return await User.findOneAndUpdate(
    {
      _id: new ObjectId(adminId),
      isDeleted: false,
    },
    {
      // eslint-disable-next-line
      ...(status && {
        status,
      }),
    },
    {
      new: true,
    },
  ).select("-password");
};

const getAllAdmins = async ({
  query = {},
  options,
}: GetAllAdminsData): Promise<{ data: UserDocument[]; totalCount: number }> => {
  const [data, totalCount] = await Promise.all([
    User.find(query, {}, options),
    User.countDocuments(query),
  ]);

  return { data, totalCount };
};

const forgotPassword = async (email: string): Promise<any> => {
  const user = await User.findOne({ email, isDeleted: false });

  if (user == null) {
    return await generateAPIError(errorMessages.userNotFound, 400);
  }

  if (user?.status !== UserStatus.ACTIVE) {
    return await generateAPIError(errorMessages.userAccountBlocked, 401);
  }

  const uuId = getUuid();

  await User.findOneAndUpdate(user?._id, {
    resetId: uuId,
  });

  const obj: sendMailData = {
    to: user?.email,
    text: await resetLinkEmailTemplate({
      username: user?.userName ?? "",
      uuId,
    }),
    subject: "Grand thornton",
  };

  const sendMail = await sendEmail(obj);

  if (!sendMail) {
    await User.deleteOne({ email });
    return await generateAPIError(errorMessages.emailSendFailed, 400);
  }

  return {
    message: successMessages.linkSend,
  };
};

const updatePassword = async ({
  resetId,
  password,
}: UpdatePasswordData): Promise<any> => {
  if (resetId != null) {
    const user = await User.findOne({ resetId, isDeleted: false });

    if (user == null) {
      return await generateAPIError(errorMessages.linkExpired, 400);
    }

    const hashedPassword = await hashValue(password, 10);

    await User.findByIdAndUpdate(user?._id, {
      password: hashedPassword,
      resetId: "",
    });

    return {
      message: "password reset successfully ",
    };
  }
};

export const userService = {
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
