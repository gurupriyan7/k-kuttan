/* eslint-disable no-dupe-keys */
import { ObjectId } from "../../constants/type.js";
import { CreatePostData } from "./post.interface.js";
import Post from "./post.model.js";
import { PostDocument } from "./post.types.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import { UserRole } from "../../modules/user/user.enum.js";
import { FilterQuery, QueryOptions } from "mongoose";

const createPost = async (
  createPostData: CreatePostData,
): Promise<PostDocument> => {
  return await Post.create(createPostData);
};

// const updatePost = async (postId: string, postData: any): Promise<any> => {
//   const {
//     summary,
//     story,
//     title,
//     like,
//     comment,
//     approvalStatus,
//     status,
//     image,
//     amount,
//     category,
//     tag,
//     role,
//     userId,
//     unlike,
//   } = postData;

//   const isAdmin = role === UserRole.ADMIN;

//   const post: any = await Post.findOne({
//     _id: new ObjectId(postId),
//     isDeleted: false,
//   });
//   let likes: any;
//   let comments: any;

//   if (!post) {
//     return await generateAPIError(errorMessages.postNotFount, 401);
//   }
//   if (comment != null) {
//     const commentData = {
//       comment,
//       userId,
//     };
//     comments = {
//       $push: { comments: commentData },
//     };
//   }

//   if (like | unlike) {
//     if (post?.likes?.includes(String(userId))) {
//       likes = {
//         $pull: { likes: userId },
//       };
//     } else {
//       likes = {
//         $push: { likes: userId },
//       };
//     }
//   }

//   console.log(story,"storiesss");

//   return await Post.findOneAndUpdate(
//     {
//       _id: new ObjectId(postId),
//       isDeleted: false,
//     },
//     {
//       ...(like != null && {
//         ...likes,
//       }),
//       ...(comment != null && {
//         ...comments,
//       }),
//       ...(summary != null && {
//         ...summary,
//       }),
//       ...(story != null && {
//         ...story,
//       }),
//       ...(title != null && {
//         ...title,
//       }),
//       ...(isAdmin &&
//         approvalStatus != null && {
//           ...approvalStatus,
//         }),
//       ...(isAdmin &&
//         status != null && {
//           ...status,
//         }),
//       ...(image != null && {
//         ...image,
//       }),
//       ...(amount != null && {
//         ...amount,
//       }),
//       ...(category != null && {
//         ...category,
//       }),
//       ...(tag != null && {
//         ...tag,
//       }),
//     },
//     { new: true }
//   );
// };

const updatePost = async (postId: string, postData: any): Promise<any> => {
  const {
    summary,
    story,
    title,
    like,
    comment,
    approvalStatus,
    status,
    isDraft,
    image,
    amount,
    category,
    tag,
    role,
    userId,
    unlike,
  } = postData;

  const isAdmin = role === UserRole.ADMIN;

  // Find the post to update
  const post: any = await Post.findOne({
    _id: new ObjectId(postId),
    isDeleted: false,
  });

  if (!post) {
    return await generateAPIError(errorMessages.postNotFount, 401);
  }

  const updateData: any = {};

  // Handle comments
  if (comment != null) {
    updateData.$push = updateData.$push || {};
    updateData.$push.comments = { comment, userId };
  }

  // Handle likes and unlikes
  if (like || unlike) {
    if (post.likes.includes(String(userId))) {
      updateData.$pull = updateData.$pull || {};
      updateData.$pull.likes = userId;
    } else {
      updateData.$push = updateData.$push || {};
      updateData.$push.likes = userId;
    }
  }

  // Directly assign other fields if they are not null
  if (summary != null) updateData.summary = summary;
  if (story != null) updateData.story = story;
  if (title != null) updateData.title = title;
  if (isAdmin && approvalStatus != null)
    updateData.approvalStatus = approvalStatus;
  if (isAdmin && status != null) updateData.status = status;
  if (image != null) updateData.image = image;
  if (amount != null) updateData.amount = amount;
  if (category != null) updateData.category = category;
  if (tag != null) updateData.tag = tag;
  if (isDraft != null) updateData.isDraft = isDraft;

  // Perform the update
  return await Post.findOneAndUpdate(
    {
      _id: new ObjectId(postId),
      isDeleted: false,
    },
    updateData,
    { new: true },
  );
};

const getAllPostsByUser = async ({
  query,
  options,
}: {
  query: FilterQuery<typeof Post>;
  options: QueryOptions;
}): Promise<{ data: PostDocument[]; totalCount: number } | any> => {
  const [data, totalCount] = await Promise.all([
    Post.find(query, {}, options).populate("createdBy"),
    Post.countDocuments(query),
  ]);

  return {
    data,
    totalCount,
  };
};

const updatePostLikeAndComment = async (
  postId: string,
  postData: any,
): Promise<any> => {
  const post: any = await Post.findOne({
    _id: new ObjectId(postId),
    isDeleted: false,
  });
  let likes: any;
  let comments: any;
  const { like, unlike, comment, userId } = postData;

  if (!post) {
    return await generateAPIError(errorMessages.postNotFount, 401);
  }
  if (comment != null) {
    const commentData = {
      comment,
      userId,
    };
    comments = {
      $push: { comments: commentData },
    };
  }
  if (like || unlike) {
    console.log(like);

    if (post?.likes?.includes(String(userId))) {
      likes = {
        $pull: { likes: userId },
      };
    } else {
      likes = {
        $push: { likes: userId },
      };
    }
  }

  return await Post.findOneAndUpdate(
    {
      _id: new ObjectId(postId),
      isDeleted: false,
    },
    {
      ...(like != null && {
        ...likes,
      }),
      ...(comment != null && {
        ...comments,
      }),
    },
  );
};

const getAllPosts = async ({
  query,
  options,
  userId,
  isMostLiked,
}: {
  query: FilterQuery<typeof Post>;
  options: QueryOptions;
  userId?: string;
  isMostLiked?: boolean;
}): Promise<{ data: PostDocument[]; totalCount: number } | any> => {
  console.log(userId, "userId");

  const data = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
      },
    },
    {
      $unwind: {
        path: "$createdBy",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: query,
    },
    {
      $addFields: {
        noOfComments: { $size: "$comments" },
      },
    },
    {
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "comments.userId",
        foreignField: "_id",
        as: "comments.userId",
      },
    },

    {
      $unwind: {
        path: "$comments.userId",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$_id",
        createdBy: { $first: "$createdBy" },
        comments: { $push: "$comments" }, // Group comments back into an array
        otherFields: { $mergeObjects: "$$ROOT" },
        // Add other fields you need from the original Post document
      },
    },
    {
      $addFields: {
        comments: {
          $map: {
            input: { $reverseArray: "$comments" }, // Reverse the array to get latest comments first
            as: "comment",
            in: "$$comment",
          },
        },
      },
    },
    {
      $lookup: {
        from: "payment_transactions",
        let: { userId, postId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$userId", "$$userId"] },
                  { $eq: ["$postId", "$$postId"] },
                  { $eq: ["$status", "success"] },
                  // Add other conditions if needed
                ],
              },
            },
          },
        ],
        as: "payments",
      },
    },
    {
      $addFields: {
        createdBy: {
          userName: "$createdBy.userName",
          profileImage: "$createdBy.profileImage",
        },
        comments: {
          $cond: {
            if: { $eq: [{ $size: "$comments" }, 0] },
            then: [],
            else: {
              $map: {
                input: "$comments",
                as: "comment",
                in: {
                  $mergeObjects: [
                    "$$comment",
                    {
                      userId: {
                        userName: "$$comment.userId.userName",
                        profileImage: "$$comment.userId.profileImage",
                      },
                    },
                  ],
                },
              },
            },
          },
        },
        likes: { $size: "$otherFields.likes" },
      },
    },

    {
      $project: {
        _id: 1,
        "createdBy.userName": 1,
        "createdBy.profileImage": 1,
        "createdBy._id": 1,
        comments: 1,
        summary: "$otherFields.summary",
        // story: '$otherFields.story',
        noOfComments: "$otherFields.noOfComments",
        title: "$otherFields.title",
        likes: 1,
        status: "$otherFields.status",
        isFree: "$otherFields.isFree",
        approvalStatus: "$otherFields.approvalStatus",
        // isPaid: '$otherFields.isPaid',
        isPaid: {
          $switch: {
            branches: [
              {
                case: { $gt: [{ $size: "$payments" }, 0] },
                then: true,
              },
            ],
            default: false, // Value to assign if none of the conditions match
          },
        },
        amount: "$otherFields.amount",
        story: {
          $cond: {
            if: {
              $or: [
                { $eq: ["$otherFields.isFree", true] },
                { $gt: [{ $size: "$payments" }, 0] },
              ],
            },
            then: "$otherFields.story",
            else: "", // Value to assign if none of the conditions match
          },
        },

        category: "$otherFields.category",
        image: "$otherFields.image",
        isDeleted: "$otherFields.isDeleted",
        createdAt: "$otherFields.createdAt",
        updatedAt: "$otherFields.updatedAt",
        __v: "$otherFields.__v",
        payments: 1,
        liked: "$otherFields.likes",
        isDraft: "$otherFields.isDraft",
        isLiked: {
          $switch: {
            branches: [
              {
                case: { $in: [userId, "$otherFields.likes"] }, // Check if userId is in the otherFields.likes array
                then: true,
              },
            ],
            default: false, // Value to assign if userId is not in the otherFields.likes array
          },
        },
      },
    },
    {
      $sort: options?.sort,
    },
    {
      $facet: {
        metadata: [{ $count: "total" }],
        data: [{ $skip: options?.skip ?? 0 }, { $limit: options?.limit ?? 10 }],
      },
    },
  ]);

  return {
    data: data[0]?.data,
    totalCount: data[0]?.metadata[0]?.total || 0,
  };
};

const findPostById = async (
  postId: string,
  userId?: string,
): Promise<PostDocument | null> => {
  const data = await getAllPosts({
    query: {
      isDeleted: false,
      _id: new ObjectId(postId),
    },
    options: {
      sort: { createdBy: -1 },
    },
    userId,
  });

  console.log(data?.data[0], "postData--------", userId);

  return data?.data[0];
};

export const postService = {
  createPost,
  updatePost,
  getAllPostsByUser,
  updatePostLikeAndComment,
  getAllPosts,
  findPostById,
};
