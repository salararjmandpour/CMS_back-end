import * as Joi from 'joi';

export const forgotPasswordValidator = Joi.object({
  email: Joi.string().email().required(),
});

export const postResetPasswordValidator = Joi.object({
  password: Joi.string().min(8).required(),
  token: Joi.string().required(),
});
