import { ProjectDocument } from "./projects.types.js";
import Project from "./projects.model.js";
// import { generateAPIError } from "../../errors/apiError.js";
// import { errorMessages, successMessages } from "../../constants/messages.js";
import {
  AddProjectData,
  GetAllProjectsData,
  GetProjectData,
  GetUserProjectsData,
} from "./projects.interface.js";

const addProject = async (
  projectData: AddProjectData,
): Promise<ProjectDocument> => {
  const { userId, name, portfolioSize, portfolioCategory, portfolioAge } =
    projectData;

  const project = await Project.create({
    userId,
    name,
    portfolioSize,
    portfolioCategory,
    portfolioAge,
  });

  return project;
};

const getAllProjects = async ({
  query = {},
}: GetAllProjectsData): Promise<{
  data: ProjectDocument[];
  totalCount: number;
}> => {
  const data = await Project.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
  ]);

  const totalCount = await Project.countDocuments(query);

  return { data, totalCount };
};

const getUserProjects = async ({
  query = {},
  options,
}: GetUserProjectsData): Promise<{
  data: ProjectDocument[];
  totalCount: number;
}> => {
  const [data, totalCount] = await Promise.all([
    Project.find(query, {}, options),
    Project.countDocuments(query),
  ]);

  return { data, totalCount };
};

const getProject = async ({
  query,
}: GetProjectData): Promise<ProjectDocument | null> => {
  return await Project.findOne(query);
};

const updateProject = async (
  { query }: GetAllProjectsData,
  projectData: Partial<ProjectDocument>,
): Promise<ProjectDocument | null> => {
  return await Project.findOneAndUpdate(
    query,
    { $set: projectData },
    { new: true },
  );
};

const deleteProject = async ({
  query,
}: GetAllProjectsData): Promise<ProjectDocument | null> => {
  return await Project.findOneAndDelete(query, {});
};

export const projectService = {
  addProject,
  getAllProjects,
  getUserProjects,
  getProject,
  updateProject,
  deleteProject,
};
