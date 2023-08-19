import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const updateCategoryValidator = Joi.object({
  title: Joi.string(),
  name: Joi.string(),
  disabled: Joi.boolean(),
  parent: Joi.string()
    .pattern(objectIdPattern)
    .error(new Error(ResponseMessages.INVALID_OBJECT_ID)),
});
