import { FilterQuery } from "mongoose";
import { Response, NextFunction } from "express";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { responseUtils } from "../../utils/response.utils.js";
import { questionGroupsService } from "./questionGroup.service.js";
import { appConfig } from "../../config/appConfig.js";
import { ObjectId } from "../../constants/type.js";
import Area from "../../modules/areas/area.model.js";
import { generateAPIError } from "../../errors/apiError.js";
import { errorMessages } from "../../constants/messages.js";
import { partsService } from "../../modules/parts/parts.service.js";
import { RequestWithUser } from "../../interface/app.interface.js";

const getQuestionGroup = errorWrapper(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const selectedArea = await Area.findOne({
      _id: new ObjectId(req.params?.id),
      isDeleted: false,
    }).select("categoryId");

    if (selectedArea == null) {
      return await generateAPIError(errorMessages.areaNotFound, 404);
    }

    const isAssessment =
      String(selectedArea?.categoryId) === String(appConfig?.assessmentId);

    const query: FilterQuery<any> = {
      isDeleted: false,
      areaId: new ObjectId(req.params?.id),
    };

    let data = {};

    if (isAssessment) {
      data = await partsService.getAllParts({ query, userId: req.user?._id });
    } else {
      console.log(query, "query");

      data = await questionGroupsService.getQuestionGroup(query);
    }

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export { getQuestionGroup };
