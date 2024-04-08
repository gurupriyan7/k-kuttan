import { FilterQuery, QueryOptions } from "mongoose";
import Project from "./projects.model.js";

export interface AddProjectData {
  userId: string;
  name: string;
  portfolioSize: string;
  portfolioCategory: string;
  portfolioAge: string;
}

export interface GetAllProjectsData {
  query: FilterQuery<typeof Project>;
  // options?: QueryOptions;
}

export interface GetUserProjectsData {
  query: FilterQuery<typeof Project>;
  options?: QueryOptions;
}

export interface GetProjectData {
  query: FilterQuery<typeof Project>;
}
