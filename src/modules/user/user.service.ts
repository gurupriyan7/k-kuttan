import bcrypt from "bcryptjs";
import { UserDocument } from "./user.types.js";
import User from "./user.model.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages, successMessages } from "../../constants/messages.js";
import { hashValue } from "./user.utils.js";
import { UserApprovalStatus, UserRole, UserStatus } from "./user.enum.js";
import { generateToken } from "../../utils/auth.utils.js";
import {
  // GetAllAdminsData,
  UpdatePasswordData,
  UpdateUserData,
  UserLoginData,
  UserSignUpData,
} from "./user.interface.js";
import { ObjectId } from "../../constants/type.js";
import { getUuid, resetLinkEmailTemplate } from "../../utils/app.utils.js";
import { sendMailData } from "../../interface/app.interface.js";
import { sendEmail } from "../../utils/sendMail.js";
import Post from "../../modules/post/post.model.js";

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
    // phoneNumber,
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
    // phoneNumber,
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
    // phoneNumber: user?.phoneNumber,
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
  const { email, password, role } = userData;

  const isAuthor = role === UserRole.AUTHOR;

  const user: any = await User.findOne({
    email,
    isDeleted: false,
    role,
    ...(isAuthor && {
      approvalStatus: UserApprovalStatus.APPROVED,
    }),
  });

  // if(isAuthor&& user?.approvalStatus!==UserApprovalStatus.APPROVED){

  // }

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

  const postCount = await Post.countDocuments({
    createdBy: new ObjectId(user?._id),
  });

  return {
    _id: user?._id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    userName: user?.userName,
    email: user?.email,
    role: user?.role,
    status: user?.status,
    coverImage: user?.coverImage,
    phoneNumber: user?.phoneNumber,
    profileImage: user?.profileImage,
    followers: user?.followers?.length ?? 0,
    followings: user?.followings?.length ?? 0,
    posts: postCount ?? 0,
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

  const postCount = await Post.countDocuments({
    createdBy: new ObjectId(user?._id),
  });
  return {
    token: await generateToken({ id: user?._id }),
    ...{
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      role: user?.role,
      status: user?.status,
      phoneNumber: user?.phoneNumber,
      followers: user?.followers?.length ?? 0,
      followings: user?.followings?.length ?? 0,
      posts: postCount ?? 0,
    },
  };
};

const updateUser = async (
  userId: string,
  userData: UpdateUserData,
): Promise<any> => {
  const user: any = await User.findOne({
    _id: new ObjectId(userId),
    isDeleted: false,
  });
  if (user == null) {
    return await generateAPIError(errorMessages.userNotFound, 404);
  }

  const {
    // password,
    firstName,
    lastName,
    userName,
    phoneNumber,
    profileImage,
    coverImage,
    savedPost,
    // follower,
    // followerAuthor,
    following,
    password,
    newPassword,
  } = userData;
  let followings: any;
  let savedPosts: any;
  let followers: any;
  let hashedPassword;
  if (following != null) {
    const followUser: any = await User.findOne({
      _id: new ObjectId(following),
      isDeleted: false,
    });
    if (followUser == null) {
      return await generateAPIError(errorMessages.userNotFound, 404);
    }
    if (followUser?.followers?.includes(userId)) {
      followers = {
        $pull: { followers: userId },
      };
      followings = {
        $pull: { followings: following },
      };
    } else {
      followers = {
        $push: { followers: userId },
      };
      followings = {
        $push: { followings: following },
      };
    }
  }
  // if (follower != null) {
  //   if (user?.followers?.includes(String(follower))) {
  //     followers = {
  //       $pull: { followers: follower },
  //     };
  //     followings = {
  //       $pull: { followings: userId },
  //     };
  //   } else {
  //     followers = {
  //       $push: { followers: follower },
  //     };
  //     followings = {
  //       $push: { followings: userId },
  //     };
  //   }
  // }

  if (password != null && newPassword != null) {
    const comparePassword = await bcrypt.compare(password, user.password ?? "");

    if (!comparePassword) {
      return await generateAPIError(errorMessages.passwordNotMatch, 400);
    }

    hashedPassword = await hashValue(newPassword, 10);
  }

  if (savedPost != null) {
    if (user?.savedPosts?.includes(String(savedPost))) {
      savedPosts = {
        $pull: { savedPosts: savedPost },
      };
    } else {
      savedPosts = {
        $push: { savedPosts: savedPost },
      };
    }
  }
  await User.findOneAndUpdate(
    { _id: new ObjectId(following) },
    {
      ...(following != null && {
        ...followers,
      }),
    },
  );

  const data = await User.findOneAndUpdate(
    {
      _id: new ObjectId(userId),
      isDeleted: false,
    },
    {
      ...(firstName != null && {
        firstName,
      }),
      ...(lastName != null && {
        lastName,
      }),
      ...(userName != null && {
        userName,
      }),
      ...(phoneNumber != null && {
        phoneNumber,
      }),
      ...(profileImage != null && {
        profileImage,
      }),
      ...(coverImage != null && {
        coverImage,
      }),
      ...(following != null && {
        ...followings,
      }),
      // ...(follower != null && {
      //   ...followers,
      // }),
      ...(savedPost != null && {
        ...savedPosts,
      }),
      ...(password != null &&
        newPassword != null && {
          password: hashedPassword,
        }),
    },
    { new: true },
  )
    .populate({
      path: "followers",
      select: "firstName profileImage lastName",
    })
    .populate({
      path: "followings",
      select: "firstName profileImage lastName",
    });
  const postCount = await Post.countDocuments({
    createdBy: new ObjectId(user?._id),
  });

  return {
    // token: await generateToken({ id: user?._id }),
    // ...{
    firstName: data?.firstName,
    lastName: data?.lastName,
    email: data?.email,
    role: data?.role,
    status: data?.status,
    phoneNumber: data?.phoneNumber,
    followers: data?.followers,
    followings: data?.followings,
    posts: postCount ?? 0,
    profileImage: data?.profileImage,
    coverImage: data?.coverImage,
    userName: data?.userName,
    // },
  };
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
    subject: "k-kuttan",
  };

  const sendMail = await sendEmail(obj);

  if (!sendMail) {
    // await User.deleteOne({ email })
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

const updateUserByAdmin = async (userId: string): Promise<any> => {
  return await User.findOneAndUpdate(
    {
      _id: new ObjectId(userId),
      isDeleted: false,
      role: { $ne: UserRole.ADMIN },
    },
    { new: true }, // This option returns the modified document rather than the original
  ).populate("-password");
};
const findUserById = async ({
  userId,
  isFollowers,
  isFollowing,
}: any): Promise<any> => {
  // console.log(userId, "userIddd");

  return await User.findOne({
    _id: new ObjectId(userId),
    isDeleted: false,
  })
    .populate([
      ...(isFollowers
        ? [
            {
              path: "followers",
              select: "firstName profileImage lastName",
            },
          ]
        : []),
      ...(isFollowing
        ? [
            {
              path: "followings",
              select: "firstName profileImage lastName",
            },
          ]
        : []),
    ])
    .select("-password"); // Uncomment if needed to exclude the password field

  // const postCount = await Post.countDocuments({
  //   createdBy: new ObjectId(userId),
  //   isDeleted: false,
  // })
  // const data: any = userData
  // data.postCount = postCount

  // return data
};

const getAllUsers = async ({ query, options }: any): Promise<any> => {
  // const data = await User.find(query, {}, options)
  const data = await User.find(
    query,
    "firstName lastName profileImage _id userName role followers",
    options,
  );
  const totalCount = await User.countDocuments(query);

  return { data, totalCount };
};

export const userService = {
  userSignUp,
  userSignIn,
  adminSignIn,
  updateUser,
  forgotPassword,
  updatePassword,
  updateUserByAdmin,
  findUserById,
  getAllUsers,
};
