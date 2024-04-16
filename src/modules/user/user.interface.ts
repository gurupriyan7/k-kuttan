import { FilterQuery, QueryOptions } from "mongoose";
import User from "./user.model.js";

export interface UserSignUpData {
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  profileImage: string;
  coverImage: string;
  password: string;
  role: string;
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
