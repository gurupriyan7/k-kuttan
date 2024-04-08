import joi from "joi";

export const addProjectSchema = joi.object({
  name: joi.string().required().messages({
    "any.required": "name is a required field",
  }),
  portfolioSize: joi.string(),
  portfolioCategory: joi.string(),
  portfolioAge: joi.string(),
});
