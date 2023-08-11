import * as Joi from 'joi';
import { rolesPattern } from 'src/core/constants/pattern.constant';

export const setPublicConfigValidator = Joi.object({
  siteTitle: Joi.string(),
  email: Joi.string().email(),
  role: Joi.string().pattern(rolesPattern),
  timezone: Joi.string(),
  _id: Joi.string(),
});
