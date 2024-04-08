import Question from "./question.model.js";

const createQuestions = async (questionData: any): Promise<any> => {
  return await Question.create(questionData);
};

export const questionService = {
  createQuestions,
};
