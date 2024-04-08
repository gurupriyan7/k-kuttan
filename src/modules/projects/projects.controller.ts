import { Response, Request, NextFunction } from "express";

import { responseUtils } from "../../utils/response.utils.js";
import { errorWrapper } from "../../middleware/errorWrapper.js";
import { projectService } from "./projects.service.js";
import { ObjectId } from "../../constants/type.js";
import { generateSyncAPIError } from "../../errors/apiError.js";
// import { ObjectId } from '../../constants/type.js'

const createProject = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req?.user?._id;
    const data = await projectService.addProject({
      ...req.body,
      userId,
      status: false,
    });

    return responseUtils.success(res, {
      data,
      status: 201,
    });
  },
);

const getAllProjects = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const status = req.query.status;
    // eslint-disable-next-line
    const query = status ? { status: status === "false" ? false : true } : {};
    const data = await projectService.getAllProjects({ query });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const getUserProjects = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req?.user?._id;
    const status = req.query.status;
    // eslint-disable-next-line
    const query = status
      ? {
          // eslint-disable-next-line
          status: status === "false" ? false : true,
          userId: new ObjectId(userId),
        }
      : { userId: new ObjectId(userId) };
    const data = await projectService.getUserProjects({
      query,
    });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const getProjectId = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;
    const data = await projectService.getProject({ query: { _id: projectId } });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

const approveOrRejectProject = errorWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const projectId = req.params.id;
    const action = req.params.action;
    const project = await projectService.getProject({
      query: { _id: projectId },
    });
    // eslint-disable-next-line
    if (!project) throw generateSyncAPIError("Project not found", 404);
    if (project.status)
      throw generateSyncAPIError("Project already approved", 400);
    if (action !== "approve" && action !== "reject") {
      return responseUtils.error(res, {
        message: "Invalid action",
        status: 400,
      });
    }
    let data;
    if (action === "approve") {
      data = await projectService.updateProject(
        { query: { _id: projectId } },
        {
          status: true,
        },
      );
    } else {
      data = await projectService.deleteProject({ query: { _id: projectId } });
    }
    // const data = await projectService.updateProject({ query: { _id: projectId } }, {
    //   status: action === "approve" ? true : false,
    // });
    // const data = await projectService.updateProject({query:{_id:projectId}},{
    //   status: true,
    // });

    return responseUtils.success(res, {
      data,
      status: 200,
    });
  },
);

export {
  createProject,
  getAllProjects,
  getUserProjects,
  getProjectId,
  approveOrRejectProject,
};
