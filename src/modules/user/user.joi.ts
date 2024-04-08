/* eslint-disable prefer-regex-literals */
import joi from "joi";

export const signupSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  password: joi
    .string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"),
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character",
      "any.required": "Password is a required field",
    }),
  name: joi.string().required().messages({
    "string.required": "Name is a required field",
  }),
  industry: joi.string().required().messages({
    "any.required": "Industry is a required field",
  }),
  position: joi.string().required().messages({
    "any.required": "Position is a required field",
  }),
  org: joi.string().required().messages({
    "any.required": "Org is a required field",
  }),
  country: joi.string().required().messages({
    "any.required": "Country is a required field",
  }),
});

export const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  password: joi.string().required().messages({
    "any.required": "Password is a required field",
  }),
});
export const updateAdminSchema = joi.object({
  status: joi.string().required().messages({
    "any.required": "Status is a required field",
  }),
});
export const forGotPasswordLinkSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
});
export const resetPasswordSchema = joi.object({
  resetId: joi.string().required().messages({
    "any.required": "ResetId is a required field",
  }),
  password: joi.string().required().messages({
    "any.required": "Password is a required field",
  }),
});

export const adminSignUpSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is a required field",
  }),
  password: joi
    .string()
    .min(8)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"),
    )
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain atleast one uppercase letter, one lowercase letter, one number and one special character",
      "any.required": "Password is a required field",
    }),
  name: joi.string().required().messages({
    "string.required": "Name is a required field",
  }),
});
