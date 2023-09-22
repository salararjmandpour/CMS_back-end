import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { createSeoValidator } from 'src/modules/seo/validators/create-seo-validator';

export const updateCategoryValidator = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  slug: Joi.string(),
  parent: Joi.string()
    .pattern(objectIdPattern)
    .error(new Error(ResponseMessages.INVALID_OBJECT_ID)),
});

export const updateCategoryWithSeoValidator = Joi.object({
  category: updateCategoryValidator,
  seo: createSeoValidator,
});
