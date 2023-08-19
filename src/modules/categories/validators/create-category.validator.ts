import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';

export const createCategoryValidator = Joi.object({
  title: Joi.string().required(),
  name: Joi.string().required(),
  disabled: Joi.boolean(),
  parent: Joi.string().pattern(objectIdPattern),
});
