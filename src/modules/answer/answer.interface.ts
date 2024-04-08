interface Response {
  questionId: string;
  subCategory: string;
  optionId: string;
  questionGroupId: string;
  partId: string;
}

export interface ResponseData {
  userId: string;
  response: [Response];
}
