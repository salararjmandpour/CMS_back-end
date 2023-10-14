import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const setEmailConfigValidator = Joi.object({
  host: Joi.string().required(),
  port: Joi.string().required(),
  user: Joi.string().required(),
  pass: Joi.string().required(),
  senderEmail: Joi.string().required(),
  _id: Joi.string()
    .pattern(objectIdPattern)
    .error(new Error(ResponseMessages.INVALID_OBJECT_ID)),
});
