import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const setSmsConfigValidator = Joi.object({
  panel: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  senderNumber: Joi.string().required(),
  _id: Joi.string()
    .pattern(objectIdPattern)
    .error(new Error(ResponseMessages.INVALID_OBJECT_ID)),
});
