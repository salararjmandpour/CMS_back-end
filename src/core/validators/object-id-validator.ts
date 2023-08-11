import * as Joi from 'joi';
import { objectIdPattern } from '../constants/pattern.constant';
import { ResponseMessages } from '../constants/response-messages.constant';

export const objectIdValidator = Joi.object({
  id: Joi.string()
    .pattern(objectIdPattern)
    .error(new Error(ResponseMessages.INVALID_OBJECT_ID)),
});
