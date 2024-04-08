import { ObjectId } from "../../constants/type.js";
import { ResponseData } from "./answer.interface.js";
import Answer from "./answer.model.js";
import { AnswerDocument } from "./answer.types.js";

const createQuestionResponse = async (
  responseData: ResponseData,
): Promise<AnswerDocument> => {
  return await Answer.create(responseData);
};

const getAllUserResponses = async (
  userId: string,
): Promise<AnswerDocument[] | null> => {
  return await Answer.find({
    userId: new ObjectId(userId),
    isDeleted: false,
  });
};

export const questionResponseService = {
  createQuestionResponse,
  getAllUserResponses,
};
