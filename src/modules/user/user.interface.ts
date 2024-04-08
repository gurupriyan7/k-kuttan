import { FilterQuery, QueryOptions } from "mongoose";
import User from "./user.model.js";

export interface UserSignUpData {
  email: string;
  name: string;
  password: string;
  industry: string;
  position: string;
  org: string;
  role: string;
  country: string;
}

export interface UserLoginData {
  email: string;
  password: string;
  role?: string;
}

export interface AdminData {
  email: string;
  name: string;
  password: string;
  role: string;
}

export interface GetAllAdminsData {
  query: FilterQuery<typeof User>;
  options?: QueryOptions;
}

export interface UpdatePasswordData {
  password: string;
  resetId?: string;
}
