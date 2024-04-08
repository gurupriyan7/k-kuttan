import { Response, Request, NextFunction } from "express";
import { FilterQuery } from "mongoose";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { categoryService } from "./categories.service.js";
import Category from "./categories.model.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";

const createCategories = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await categoryService.createCategories({
      ...req.body,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

const getAllCategories = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const query: FilterQuery<typeof Category> = {
      isDeleted: false,
    };

    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });
    const data = await categoryService.getAllCategories({
      query,
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

export { createCategories, getAllCategories };
