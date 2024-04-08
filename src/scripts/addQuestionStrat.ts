import Category from "../modules/categories/categories.model.js";
import QuestionGroup from "../modules/questionGroup/questionGroup.model.js";
import Question from "../modules/question/question.model.js";
import strategicQuestions from "../data/strategicQuestions.js";
import { ObjectId } from "../constants/type.js";
import connect from "../utils/dbConnection.js";

async function runner(): Promise<void> {
  await connect();

  const category = await Category.create({
    name: "Strategic Questions",
    isDeleted: false,
  });

  console.log("Category created");

  const section = strategicQuestions.strategicQuestions;
  const questionGroup = await QuestionGroup.create({
    categoryId: category._id,
    questions: [],
    isDeleted: false,
  });
  console.log("Question Group created");
  let qno = 1;
  const questionIds = [];
  for (const question of section) {
    const ques = await Question.create({
      questionText: question,
      type: "mcq",
      categoryId: category._id,
      questionNo: qno,
      options: [
        {
          option: "Somewhat",
          value: "somewhat",
        },
        {
          option: "Moderate",
          value: "moderate",
        },
        {
          option: "Significant",
          value: "significant",
        },
        {
          option: "Exceptional",
          value: "exceptional",
        },
      ],
      isDeleted: false,
    });
    qno++;
    questionIds.push(ques._id);
  }
  console.log("Questions created:", questionIds.length);
  // eslint-disable-next-line
  questionGroup.questions = questionIds as unknown as (typeof ObjectId)[];
  await questionGroup.save();
  console.log("Question Group updated with questions");
}

runner()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
