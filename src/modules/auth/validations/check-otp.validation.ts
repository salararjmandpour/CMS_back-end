import * as joi from 'joi';

export const checkOtpSchema = joi.object({
  mobile: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .required(),
  code: joi.string().length(6).required(),
});
