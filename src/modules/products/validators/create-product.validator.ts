import * as Joi from 'joi';
import { SizeValidator, SpecificationsValidator } from './public.validator';
import { objectIdPattern } from 'src/core/constants/pattern.constant';

export const createProductValidator = Joi.object({
  productId: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  shortDescription: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number().required(),
  count: Joi.number().required(),
  size: SizeValidator,
  inStock: Joi.boolean().required(),
  category: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .error(new Error('category should be objectId')),
  specifications: SpecificationsValidator,
});
