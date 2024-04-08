import Category from "../modules/categories/categories.model.js";
import Area from "../modules/areas/area.model.js";
import QuestionGroup from "../modules/questionGroup/questionGroup.model.js";
import Question from "../modules/question/question.model.js";
import assesmentQuestions1 from "../data/assesmentQuestions1.js";
import Parts from "../modules/parts/parts.model.js";
import { ObjectId } from "../constants/type.js";
import connect from "../utils/dbConnection.js";

async function runner(): Promise<void> {
  await connect();

  const category = await Category.create({
    name: "Assessment",
    isDeleted: false,
  });

  console.log("Category created");

  const area = await Area.create({
    name: assesmentQuestions1.name,
    category: category._id,
    isDeleted: false,
  });
  console.log("Area created:", assesmentQuestions1.name);

  const part1 = assesmentQuestions1.questions.part1;
  const part = await Parts.create({
    name: "Part 01",
    part_no: 1,
    categoryId: category._id,
    areaId: area._id,
    subCategory: [],
    isDeleted: false,
  });
  let subCategory = [] as any[];
  for (const section of part1) {
    const questionGroup = await QuestionGroup.create({
      categoryId: category._id,
      areaId: area._id,
      questions: [],
      isDeleted: false,
    });
    console.log("Question Group created", section.name);
    subCategory.push({
      title: section.name,
      questionGroupId: questionGroup._id,
    });
    let qno = 1;
    const questionIds = [];
    for (const question of section.questions) {
      const ques = await Question.create({
        questionText: question.question,
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
          {
            option: "NA",
            value: "na",
          },
        ],
        isDeleted: false,
        level: question.level,
        maxScore: question.score,
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
  part.subCategory = subCategory;
  await part.save();
  console.log("Part updated with subcategories");

  // wewhe

  // wg
  subCategory = [];
  const part2 = assesmentQuestions1.questions.part2;
  const part22 = await Parts.create({
    name: "Part 02",
    part_no: 2,
    categoryId: category._id,
    areaId: area._id,
    subCategory: [],
    isDeleted: false,
  });
  const questionGroup = await QuestionGroup.create({
    categoryId: category._id,
    areaId: area._id,
    questions: [],
    isDeleted: false,
  });
  console.log("Question Group created", "Part 02");
  subCategory.push({
    title: "Part 02",
    questionGroupId: questionGroup._id,
  });
  let qno = 1;
  const questionIds = [];
  for (const question of part2) {
    const ques = await Question.create({
      questionText: question.question,
      type: "mcq",
      categoryId: category._id,
      questionNo: qno,
      options: [
        {
          option: "0",
          value: "0",
        },
        {
          option: "1",
          value: "1",
        },
        {
          option: "2",
          value: "2",
        },
        {
          option: "3",
          value: "3",
        },
        {
          option: "4",
          value: "4",
        },
        {
          option: "5",
          value: "5",
        },
        {
          option: "NA",
          value: "na",
        },
      ],
      maxScore: question.score,
      isDeleted: false,
    });
    qno++;
    questionIds.push(ques._id);
  }
  console.log("Questions created:", questionIds.length, " :", "Part 02");
  // eslint-disable-next-line
  questionGroup.questions = questionIds as unknown as (typeof ObjectId)[];
  await questionGroup.save();
  console.log("Question Group updated with questions", "Part 02");
  part22.subCategory = subCategory;
  await part22.save();
  console.log("Part updated with subcategories", "Part 02");
}

runner()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
