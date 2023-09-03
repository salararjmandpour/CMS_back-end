import * as Joi from 'joi';

export const signupAdminValidator = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().required(),
});
