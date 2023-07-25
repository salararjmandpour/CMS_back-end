import * as joi from 'joi';

export const getOtpValidation = joi.object({
  mobile: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .required(),
});
