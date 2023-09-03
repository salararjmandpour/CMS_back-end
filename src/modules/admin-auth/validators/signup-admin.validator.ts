import * as Joi from 'joi';
import { mobilePattern } from 'src/core/constants/pattern.constant';

export const signupAdminValidator = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string()
    .pattern(mobilePattern)
    .required()
    .error(new Error('mobile is invalid')),
});
