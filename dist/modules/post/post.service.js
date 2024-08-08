/* eslint-disable no-dupe-keys */
import { ObjectId } from "../../constants/type.js";
import Post from "./post.model.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import { UserRole } from "../../modules/user/user.enum.js";
import { CommentType } from "./post.enum.js";
import Comment from "./post.comments.model.js";
const createPost = async (createPostData) => {
  return await Post.create(createPostData);
};
const updatePost = async (postId, postData) => {
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
    partName,
    partNumber,
  } = postData;
  const isAdmin = role === UserRole.ADMIN;
  // Find the post to update
  const post = await Post.findOne({
    _id: new ObjectId(postId),
    isDeleted: false,
  });
  if (!post) {
    return await generateAPIError(errorMessages.postNotFount, 401);
  }
  const updateData = {};
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
  if (partName != null) updateData.partName = partName;
  if (partNumber != null) updateData.partName = partName;
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
const getAllPostsByUser = async ({ query, options, userId }) => {
  // const [data, totalCount] = await Promise.all([
  //   Post.find(query, {}, options)
  //     .populate({
  //       path: "createdBy",
  //       select: "firstName profileImage lastName",
  //     })
  //     .then(
  //       (posts) =>
  //         posts?.map((post: any) => {
  //           if (post) {
  //             post.story = ""; // Set the story field to an empty string
  //           }
  //           return post;
  //         })
  //     ),
  //   Post.countDocuments(query),
  // ]);
  const data = await Post.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              userName: 1,
              profileImage: 1,
            },
          },
        ],
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
      $addFields: {
        commentIds: {
          $cond: {
            if: { $isArray: "$commentIds" },
            then: "$commentIds",
            else: [],
          },
        },
      },
    },
    {
      $addFields: {
        noOfComments: { $size: "$commentIds" },
      },
    },
    {
      $lookup: {
        from: "comments",
        let: { commentIds: "$commentIds" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$_id", "$$commentIds"] },
                  { $eq: ["$commentType", "main"] },
                ],
              },
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        replyIds: {
          $cond: {
            if: { $isArray: "$comments.replyIds" },
            then: "$comments.replyIds",
            else: [],
          },
        },
      },
    },
    {
      $lookup: {
        from: "comments",
        let: { replyIds: "$replyIds" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$_id", "$$replyIds"] },
                  { $eq: ["$commentType", "reply"] },
                ],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $unwind: {
              path: "$userDetails",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              userId: {
                _id: "$userDetails._id",
                firstName: "$userDetails.firstName",
                lastName: "$userDetails.lastName",
                profileImage: "$userDetails.profileImage",
                userName: "$userDetails.userName",
              },
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              comment: 1,
              createdAt: 1,
              commentType: 1,
              isDeleted: 1,
            },
          },
        ],
        as: "replies",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "comments.userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        "comments.userId": {
          _id: "$userDetails._id",
          firstName: "$userDetails.firstName",
          lastName: "$userDetails.lastName",
          profileImage: "$userDetails.profileImage",
          userName: "$userDetails.userName",
        },
        "comments.replyIds": "$replies",
      },
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" }, // Add other fields you want to keep from the post document
        comments: { $push: "$comments" },
        otherFields: { $mergeObjects: "$$ROOT" },
      },
    },
    {
      $addFields: {
        likes: { $size: "$otherFields.likes" },
      },
    },
    {
      $project: {
        _id: 1,
        createdBy: "$otherFields.createdBy",
        comments: {
          $switch: {
            branches: [
              {
                case: { $gt: ["$otherFields.noOfComments", 0] }, // Directly compare the integer to 0
                then: "$comments",
              },
            ],
            default: [],
          },
        },
        summary: "$otherFields.summary",
        noOfComments: "$otherFields.noOfComments",
        title: "$otherFields.title",
        likes: 1,
        status: "$otherFields.status",
        isFree: "$otherFields.isFree",
        approvalStatus: "$otherFields.approvalStatus",
        amount: "$otherFields.amount",
        story: "",
        category: "$otherFields.category",
        image: "$otherFields.image",
        isDeleted: "$otherFields.isDeleted",
        createdAt: "$otherFields.createdAt",
        updatedAt: "$otherFields.updatedAt",
        __v: "$otherFields.__v",
        payments: 1,
        liked: "$otherFields.likes",
        partName: "$otherFields.partName",
        partNumber: "$otherFields.partNumber",
        isDraft: "$otherFields.isDraft",
        positionNumber: "$otherFields.positionNumber",
        isLiked: {
          $switch: {
            branches: [
              {
                case: { $in: [userId, "$otherFields.likes"] },
                then: true,
              },
            ],
            default: false,
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
const updatePostLikeAndComment = async (postId, postData) => {
  const post = await Post.findOne({
    _id: new ObjectId(postId),
    isDeleted: false,
  });
  let likes;
  const {
    like,
    unlike,
    comment,
    userId,
    commentType = CommentType.MAIN,
    commentId,
  } = postData;
  if (!post) {
    return await generateAPIError(errorMessages.postNotFount, 401);
  }
  if (comment != null) {
    if (commentType === CommentType.REPLY) {
      const commentData = {
        comment,
        userId,
        commentType: CommentType.REPLY,
      };
      const replyComment = await Comment.create(commentData);
      return await Comment.findOneAndUpdate(
        { _id: new ObjectId(commentId) },
        {
          $push: {
            replyIds: replyComment?._id,
          },
        },
      );
    } else {
      const commentData = {
        comment,
        userId,
        postId: post?._id,
        commentType: CommentType.MAIN,
      };
      const replyComment = await Comment.create(commentData);
      return await Post.findOneAndUpdate(
        {
          _id: new ObjectId(postId),
          isDeleted: false,
        },
        {
          $push: { commentIds: replyComment?._id },
        },
      );
    }
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
      // ...(comment != null && {
      //   ...comments,
      // }),
    },
  );
};
const getAllPosts = async ({ query, options, userId, isStoryNeeded }) => {
  console.log(userId, "userId");
  const data = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        pipeline: [
          {
            $project: {
              _id: 1,
              firstName: 1,
              lastName: 1,
              userName: 1,
              profileImage: 1,
            },
          },
        ],
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
        commentIds: {
          $cond: {
            if: { $isArray: "$commentIds" },
            then: "$commentIds",
            else: [],
          },
        },
      },
    },
    {
      $addFields: {
        noOfComments: { $size: "$commentIds" },
      },
    },
    {
      $lookup: {
        from: "comments",
        let: { commentIds: "$commentIds" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$_id", "$$commentIds"] },
                  { $eq: ["$commentType", "main"] },
                ],
              },
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $unwind: {
        path: "$comments",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        replyIds: {
          $cond: {
            if: { $isArray: "$comments.replyIds" },
            then: "$comments.replyIds",
            else: [],
          },
        },
      },
    },
    {
      $lookup: {
        from: "comments",
        let: { replyIds: "$replyIds" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$_id", "$$replyIds"] },
                  { $eq: ["$commentType", "reply"] },
                ],
              },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "userId",
              foreignField: "_id",
              as: "userDetails",
            },
          },
          {
            $unwind: {
              path: "$userDetails",
              preserveNullAndEmptyArrays: true,
            },
          },
          {
            $addFields: {
              userId: {
                _id: "$userDetails._id",
                firstName: "$userDetails.firstName",
                lastName: "$userDetails.lastName",
                profileImage: "$userDetails.profileImage",
                userName: "$userDetails.userName",
              },
            },
          },
          {
            $project: {
              _id: 1,
              userId: 1,
              comment: 1,
              createdAt: 1,
              commentType: 1,
              isDeleted: 1,
            },
          },
        ],
        as: "replies",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "comments.userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: {
        path: "$userDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $addFields: {
        "comments.userId": {
          _id: "$userDetails._id",
          firstName: "$userDetails.firstName",
          lastName: "$userDetails.lastName",
          profileImage: "$userDetails.profileImage",
          userName: "$userDetails.userName",
        },
        "comments.replyIds": "$replies",
      },
    },
    {
      $group: {
        _id: "$_id",
        title: { $first: "$title" }, // Add other fields you want to keep from the post document
        comments: { $push: "$comments" },
        otherFields: { $mergeObjects: "$$ROOT" },
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
        likes: { $size: "$otherFields.likes" },
      },
    },
    {
      $project: {
        _id: 1,
        createdBy: "$otherFields.createdBy",
        comments: {
          $switch: {
            branches: [
              {
                case: { $gt: ["$otherFields.noOfComments", 0] }, // Directly compare the integer to 0
                then: "$comments",
              },
            ],
            default: [],
          },
        },
        summary: "$otherFields.summary",
        noOfComments: "$otherFields.noOfComments",
        title: "$otherFields.title",
        likes: 1,
        status: "$otherFields.status",
        isFree: "$otherFields.isFree",
        approvalStatus: "$otherFields.approvalStatus",
        isPaid: {
          $switch: {
            branches: [
              {
                case: { $gt: [{ $size: "$payments" }, 0] },
                then: true,
              },
            ],
            default: false,
          },
        },
        amount: "$otherFields.amount",
        story: {
          $cond: {
            if: {
              $and: [
                {
                  $or: [
                    { $eq: ["$otherFields.isFree", true] },
                    { $gt: [{ $size: "$payments" }, 0] },
                    { $eq: ["$createdBy._id", userId] },
                  ],
                },
                { $eq: [isStoryNeeded, true] },
              ],
            },
            then: "$otherFields.story",
            else: "",
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
        partName: "$otherFields.partName",
        partNumber: "$otherFields.partNumber",
        isDraft: "$otherFields.isDraft",
        positionNumber: "$otherFields.positionNumber",
        isLiked: {
          $switch: {
            branches: [
              {
                case: { $in: [userId, "$otherFields.likes"] },
                then: true,
              },
            ],
            default: false,
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
  // console.log(data[0]?.data, "ddddd-------ddddd");
  return {
    data: data[0]?.data,
    totalCount: data[0]?.metadata[0]?.total || 0,
  };
};
const findPostById = async (postId, userId) => {
  const data = await getAllPosts({
    query: {
      isDeleted: false,
      _id: new ObjectId(postId),
    },
    options: {
      sort: { createdBy: -1 },
    },
    userId,
    isStoryNeeded: true,
  });
  return data?.data[0];
};
const getPostSequences = async ({ query, options }) => {
  const data = await Post.aggregate([
    {
      $match: query,
    },
    {
      $group: {
        _id: "$partName",
        partName: { $first: "$partName" },
      },
    },
    {
      $project: {
        _id: 0, // Exclude the default _id field
        label: "$partName",
        value: "$partName",
      },
    },
  ]);
  console.log(data, "data-data-data-data-data");
  return [{ value: "other", label: "Other" }, ...data];
};
const findSequencePosts = async ({ query, options, userId }) => {
  const data = await getAllPosts({
    query: {
      ...query,
    },
    options: {
      ...options,
    },
    userId,
  });
  return data?.data;
};
export const postService = {
  createPost,
  updatePost,
  getAllPostsByUser,
  updatePostLikeAndComment,
  getAllPosts,
  findPostById,
  getPostSequences,
  findSequencePosts,
};
