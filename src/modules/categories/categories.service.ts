import { ObjectId } from "../../constants/type.js";
import Category from "./categories.model.js";

const createCategories = async (categoryData: any): Promise<any> => {
  return await Category.create(categoryData);
};

const getAllCategories = async ({
  query,
  options,
}: any): Promise<{ data: any[]; totalCount: number }> => {
  const [data, totalCount] = await Promise.all([
    Category.find(query, {}, options),
    Category.countDocuments(query),
  ]);

  return { data, totalCount };
};

const getCategoryById = async (catId: string): Promise<any> => {
  return await Category.findOne({
    _id: new ObjectId(catId),
    isDeleted: false,
  });
};

export const categoryService = {
  createCategories,
  getAllCategories,
  getCategoryById,
};
