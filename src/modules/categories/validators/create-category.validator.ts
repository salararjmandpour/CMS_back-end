import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const createCategoryValidator = Joi.object({
  title: Joi.string().required(),
  name: Joi.string().required(),
  disabled: Joi.boolean(),
  parent: Joi.string()
    .pattern(objectIdPattern)
    .error(new Error(ResponseMessages.INVALID_OBJECT_ID)),
});
