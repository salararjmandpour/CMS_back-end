import * as Joi from 'joi';
import {
  objectIdPattern,
  categoryTypePattern,
} from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { createSeoValidator } from 'src/modules/seo/validators/create-seo-validator';

export const categoryValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.object().required(),
  slug: Joi.string().required(),
  image: Joi.string(),
  type: Joi.string().pattern(categoryTypePattern).required(),
  parent: Joi.string()
    .pattern(objectIdPattern)
    .error(new Error(ResponseMessages.INVALID_OBJECT_ID)),
});

export const createCategoryValidator = Joi.object({
  category: categoryValidator,
  seo: createSeoValidator,
});
