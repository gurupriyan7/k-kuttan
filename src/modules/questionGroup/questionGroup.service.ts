import QuestionGroup from "./questionGroup.model.js";

const getQuestionGroup = async (query: any): Promise<any> => {
  return await QuestionGroup.findOne(query).populate("questions");
};

export const questionGroupsService = {
  getQuestionGroup,
};
