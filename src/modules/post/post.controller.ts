/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable security/detect-non-literal-regexp */
import { NextFunction, Response } from "express";
import { RequestWithUser } from "../../interface/app.interface.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { postService } from "./post.service.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { ObjectId } from "../../constants/type.js";
import { FilterQuery } from "mongoose";
import Post from "./post.model.js";
import { UserApprovalStatus } from "../../modules/user/user.enum.js";
import { PostCategoriesEnum } from "./post.enum.js";

const createPost = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await postService.createPost({
      ...req.body,
      createdBy: req.user?._id,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);
const getPostSequences = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    console.log(req?.user?._id);

    const data = await postService.getPostSequences({
      query: {
        createdBy: new ObjectId(String(req?.user?._id)),
      },
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const getAllPostsByUser = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });
    let query: FilterQuery<typeof Post> = {
      createdBy: new ObjectId(req.user?._id),
      isDeleted: false,
    };

    const searchTerm = req.query?.searchTerm;
    if (searchTerm) {
      query = {
        ...query,
        $or: [
          {
            summary: {
              $regex: new RegExp(String(searchTerm)),
              $options: "i",
            },
          },
          {
            title: { $regex: new RegExp(String(searchTerm)), $options: "i" },
          },
          {
            story: { $regex: new RegExp(String(searchTerm)), $options: "i" },
          },
        ],
      };
    }

    const data = await postService.getAllPostsByUser({
      query: {
        ...query,
        ...(req.query?.category &&
          req?.query?.category !== PostCategoriesEnum.COMMON && {
            category: req.query?.category,
          }),
        ...(req.query?.isDraft && {
          isDraft: req?.query?.isDraft,
        }),
      },
      options: {
        ...paginationOptions,
        sort: { createdAt: -1 },
      },
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const getAllPostsByUserId = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });
    let query: FilterQuery<typeof Post> = {
      createdBy: new ObjectId(req.params?.id),
      isDeleted: false,
      isDraft: false,
      approvalStatus: UserApprovalStatus.APPROVED,
    };

    const searchTerm = req.query?.searchTerm;
    if (searchTerm) {
      query = {
        ...query,
        $or: [
          {
            summary: {
              $regex: new RegExp(String(searchTerm)),
              $options: "i",
            },
          },
          {
            title: { $regex: new RegExp(String(searchTerm)), $options: "i" },
          },
          {
            story: { $regex: new RegExp(String(searchTerm)), $options: "i" },
          },
        ],
      };
    }

    const data = await postService.getAllPostsByUser({
      query: {
        ...query,
        ...(req.query?.category && {
          category: req.query?.category,
        }),
      },
      options: {
        ...paginationOptions,
        sort: { createdAt: -1 },
      },
      userId: (req.user?._id as string) ?? "123456789",
    });
    console.log(data, "data----data---", req.params?.id);

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const updatePost = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    // const data = await postService.createPost({
    //   ...req.body,
    //   createdBy: req.user?._id,
    //   role: req.user?.role,
    // });
    const data = await postService.updatePost(req?.params?.id, {
      ...req?.body,
      role: req.user?.role,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const updatePostLikeAndComment = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await postService.updatePostLikeAndComment(req.params?.id, {
      ...req.body,
      userId: req.user?._id,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);
const findPostById = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const data = await postService.findPostById(
      req.params?.id,
      (req?.user?._id as string) ?? "1234",
    );

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const findSequencePosts = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    const isDraft = req?.query?.isDraft;
    const postId = req?.params?.id;

    const postData = await Post.findOne({
      _id: new ObjectId(postId),
      isDeleted: false,
    });

    // console.log(postData,"post-Data-post-Data");

    let query: FilterQuery<typeof Post> = {
      isDeleted: false,
      partName: postData?.partName,
      "createdBy._id": new ObjectId(String(postData?.createdBy)),
      ...(!isDraft && {
        approvalStatus: UserApprovalStatus.APPROVED,
      }),
      ...(isDraft
        ? {
            isDraft: true,
          }
        : {
            isDraft: false,
          }),
    };
    const searchTerm = req.query?.searchTerm;
    if (searchTerm) {
      query = {
        ...query,
        $or: [
          {
            summary: {
              $regex: new RegExp(String(searchTerm)),
              $options: "i",
            },
          },
          {
            title: { $regex: new RegExp(String(searchTerm)), $options: "i" },
          },
          {
            story: { $regex: new RegExp(String(searchTerm)), $options: "i" },
          },
        ],
      };
    }

    const data = await postService.getAllPosts({
      query: {
        ...query,
        ...(req.query?.category &&
          req?.query?.category !== PostCategoriesEnum.COMMON && {
            category: req.query?.category,
          }),
      },
      options: {
        ...paginationOptions,
        sort: { partNumber: 1 },
      },
      userId: (req.user?._id as string) ?? "123456789",
    });

    console.log(data, "date-date-date-date");

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const getAllPosts = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    const isDraft = req?.query?.isDraft;
    const isMostLiked = req?.query?.isMostLiked;

    let query: FilterQuery<typeof Post> = {
      isDeleted: false,
      ...(!isDraft && {
        approvalStatus: UserApprovalStatus.APPROVED,
      }),
      ...(isDraft
        ? {
            isDraft: true,
          }
        : {
            isDraft: false,
          }),
    };
    const searchTerm = req.query?.searchTerm;
    if (searchTerm) {
      query = {
        ...query,
        $or: [
          {
            summary: {
              $regex: new RegExp(String(searchTerm)),
              $options: "i",
            },
          },
          {
            title: { $regex: new RegExp(String(searchTerm)), $options: "i" },
          },
          {
            story: { $regex: new RegExp(String(searchTerm)), $options: "i" },
          },
        ],
      };
    }

    const data = await postService.getAllPosts({
      query: {
        ...query,
        ...(req.query?.category &&
          req?.query?.category !== PostCategoriesEnum.COMMON && {
            category: req?.query?.category,
          }),
        ...(req.query?.tag && {
          tag: req.query?.tag,
        }),
      },
      options: {
        ...paginationOptions,
        sort: { positionNumber: -1 },
      },
      userId: (req.user?._id as string) ?? "123456789",
      ...(isMostLiked && { isMostLiked: Boolean(isMostLiked) }),
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export {
  createPost,
  updatePost,
  getAllPostsByUser,
  updatePostLikeAndComment,
  getAllPosts,
  findPostById,
  getAllPostsByUserId,
  getPostSequences,
  findSequencePosts,
};
