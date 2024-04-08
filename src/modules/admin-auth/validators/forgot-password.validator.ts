import * as Joi from 'joi';

export const forgotPasswordValidator = Joi.object({
  email: Joi.string().email().required(),
});

export const postResetPasswordValidator = Joi.object({
  encryptedData: Joi.string().required(),
});
