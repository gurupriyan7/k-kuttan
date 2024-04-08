import Area from "./area.model.js";

const createArea = async (areaData: any): Promise<any> => {
  return await Area.create(areaData);
};

const getAreaByCategory = async ({ query, options }: any): Promise<any> => {
  const [data, totalCount] = await Promise.all([
    Area.find(query, {}, options),
    Area.countDocuments(query),
  ]);

  return { data, totalCount };
};

export const areaService = {
  createArea,
  getAreaByCategory,
};
