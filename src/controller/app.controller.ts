import { Request, Response, NextFunction } from "express";

import { responseUtils } from "../utils/response.utils.js";
import { errorWrapper } from "../middleware/errorWrapper.js";
import { successMessages } from "../constants/messages.js";
import Comment from "../modules/post/post.comments.model.js";
// import Post from "../modules/post/post.model.js";

const healthCheck = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    // const postData = await Post.find({}, {}, { sort: { createdAt: 1 } });
    const comments = await Comment.find();

    // let count = 1;
    // for (const post of postData) {
    //     post.positionNumber = count;
    //     await post.save();
    //     count++;
    // }
    for (const comment of comments) {
      await comment.save();
    }

    return responseUtils.success(res, {
      data: {
        message: successMessages.healthOk,
        timestamp: new Date().toISOString(),
      },
      status: 200,
    });
  },
);

export { healthCheck };
