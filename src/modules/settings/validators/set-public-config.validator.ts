import * as Joi from 'joi';
import {
  rolesPattern,
  objectIdPattern,
} from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const setPublicConfigValidator = Joi.object({
  siteTitle: Joi.string(),
  email: Joi.string().email(),
  description: Joi.string(),
  role: Joi.string().pattern(rolesPattern),
  siteAddress: Joi.string().required(),
  routeAddress: Joi.string().required(),
  timezone: Joi.string(),
  _id: Joi.string()
    .pattern(objectIdPattern)
    .error(new Error(ResponseMessages.INVALID_OBJECT_ID)),
});
