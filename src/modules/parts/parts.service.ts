import Parts from "./parts.model.js";

const getAllParts = async ({ query, userId }: any): Promise<any> => {
  const data = await Parts.aggregate([
    {
      $match: query,
    },
    {
      $unwind: {
        path: "$subCategory",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "question_groups",
        localField: "subCategory.questionGroupId",
        foreignField: "_id",
        as: "subCategory.questionGroupId",
      },
    },
    {
      $unwind: {
        path: "$subCategory.questionGroupId",
        preserveNullAndEmptyArrays: true,
      },
    },
    // {
    //   $lookup: {
    //     from: 'answers',
    //     let: { userId, questionGroupId: '$subCategory.questionGroupId' },
    //     pipeline: [
    //       {
    //         $match: {
    //           $expr: {
    //             $and: [
    //               { $eq: ['$$userId', '$userId'] },
    //               { $eq: ['$$questionGroupId', '$questionGroupId'] },
    //               // Add more conditions as needed
    //             ],
    //           },
    //         },
    //       },
    //     ],
    //     as: 'answer',
    //   },
    // },

    // {
    //   $lookup: {
    //     from: 'answers',
    //     localField: 'subCategory.questionGroupId',
    //     foreignField: '_id',
    //     as: 'subCategory.questionGroupId',
    //   },
    // },
    // {
    //   $unwind: {
    //     path: '$subCategory.questionGroupId',
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },

    {
      $project: {
        _id: 1,
        name: 1,
        part_no: 1,
        categoryId: 1,
        areaId: 1,
        subCategory: 1,
        answer: 1,
        isDeleted: 1,
        createdAt: 1,
        updatedAt: 1,
        __v: 1,
        isAnswered: {
          $cond: {
            if: {
              $and: [
                { $isArray: "$subCategory.questionGroupId.questions" }, // Check if it's an array
                { $in: [userId, "$subCategory.questionGroupId.questions"] }, // Use $in operator
              ],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $unwind: {
        path: "$subCategory.questionGroupId.questions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "questions",
        localField: "subCategory.questionGroupId.questions",
        foreignField: "_id",
        as: "subCategory.questionGroupId.questions",
      },
    },
    {
      $unwind: {
        path: "$subCategory.questionGroupId.questions",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$subCategory.questionGroupId._id",
        data: {
          $first: "$$ROOT",
        },
        questions: {
          $push: "$subCategory.questionGroupId.questions",
        },
      },
    },
    {
      $addFields: {
        "data.subCategory.questionGroupId.questions": "$questions",
      },
    },
    {
      $replaceRoot: {
        newRoot: "$data",
      },
    },
    {
      $group: {
        _id: "$_id",
        subCategory: {
          $push: "$subCategory",
        },
        otherFields: { $mergeObjects: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 1,
        subCategory: 1,
        name: "$otherFields.name",
        part_no: "$otherFields.part_no",
        categoryId: "$otherFields.categoryId",
        areaId: "$otherFields.areaId",
        isDeleted: "$otherFields.isDeleted",
      },
    },
  ]);

  return data;
};

export const partsService = {
  getAllParts,
};
