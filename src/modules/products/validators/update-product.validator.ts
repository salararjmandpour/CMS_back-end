import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';

const SizeValidator = Joi.object({
  length: Joi.number(),
  height: Joi.number(),
  width: Joi.number(),
  weight: Joi.number(),
  weightUnit: Joi.string().pattern(/(g|kg)/i),
  dimensionsUnit: Joi.string().pattern(/(cm|m)/i),
});

const SpecificationsValidator = Joi.object({
  key: Joi.string(),
  value: Joi.string(),
});

export const updateProductValidator = Joi.object({
  productId: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  shortDescription: Joi.string(),
  price: Joi.number(),
  discount: Joi.number(),
  count: Joi.number(),
  size: SizeValidator,
  inStock: Joi.boolean(),
  category: Joi.string()
    .pattern(objectIdPattern)
    .error(new Error('category should be objectId')),
  specifications: Joi.array().items(SpecificationsValidator),
});
