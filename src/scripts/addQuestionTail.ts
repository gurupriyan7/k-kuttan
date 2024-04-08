import Category from "../modules/categories/categories.model.js";
import Area from "../modules/areas/area.model.js";
import QuestionGroup from "../modules/questionGroup/questionGroup.model.js";
import Question from "../modules/question/question.model.js";
import tailoringQuestions from "../data/tailoringQuestions.js";
import { ObjectId } from "../constants/type.js";
import connect from "../utils/dbConnection.js";

async function runner(): Promise<void> {
  await connect();

  const category = await Category.create({
    name: "Tailoring questions",
    isDeleted: false,
  });

  console.log("Category created");

  const sections = tailoringQuestions.tailQuestions;
  for (const section of sections) {
    const area = await Area.create({
      name: section.name,
      category: category._id,
      description: section.description,
      isDeleted: false,
    });
    console.log("Area created:", section.name);
    const questionGroup = await QuestionGroup.create({
      categoryId: category._id,
      areaId: area._id,
      questions: [],
      isDeleted: false,
    });
    console.log("Question Group created", section.name);
    let qno = 1;
    const questionIds = [];
    for (const question of section.questions) {
      const ques = await Question.create({
        questionText: question,
        type: "mcq",
        categoryId: category._id,
        questionNo: qno,
        options: [
          {
            option: "Yes",
            value: "yes",
          },
          {
            option: "No",
            value: "no",
          },
        ],
        isDeleted: false,
      });
      qno++;
      questionIds.push(ques._id);
    }
    console.log("Questions created:", questionIds.length, " :", section.name);
    // eslint-disable-next-line
    questionGroup.questions = questionIds as unknown as (typeof ObjectId)[];
    await questionGroup.save();
    console.log("Question Group updated with questions", section.name);
  }
}

runner()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
