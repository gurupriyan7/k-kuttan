import { FilterQuery } from "mongoose";
import { Response, Request, NextFunction } from "express";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { areaService } from "./area.service.js";
import { getPaginationOptions } from "../../utils/pagination.utils.js";
import { ObjectId } from "../../constants/type.js";
import { questionGroupsService } from "../../modules/questionGroup/questionGroup.service.js";
import { StrategicId } from "../../constants/data.js";

const createArea = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = await areaService.createArea(req.body);

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

const getAreaByCategory = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const isStrategic = String(req.params?.id) === String(StrategicId);
    const query: FilterQuery<any> = {
      isDeleted: false,
      categoryId: new ObjectId(req.params?.id),
    };

    let data = {};

    const paginationOptions = getPaginationOptions({
      limit: req.query?.limit,
      page: req.query?.page,
    });

    if (isStrategic) {
      data = await questionGroupsService.getQuestionGroup(query);
    } else {
      data = await areaService.getAreaByCategory({
        query,
        options: {
          ...paginationOptions,
          sort: { createdAt: -1 },
        },
      });
    }

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export { createArea, getAreaByCategory };
