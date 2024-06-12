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
        ...(req.query?.isDraft && {
          isDraft: req?.query?.isDraft,
        }),
      },
      options: {
        ...paginationOptions,
        sort: { createdBy: -1 },
      },
    });

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
      req?.user?._id as string,
    );

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
        ...(req.query?.category && {
          category: req.query?.category,
        }),
        ...(req.query?.tag && {
          tag: req.query?.tag,
        }),
      },
      options: {
        ...paginationOptions,
        sort: { createdBy: -1 },
      },
      userId: (req.user?._id as string) ?? "123456789",
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
};
