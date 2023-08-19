import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';

const SizeValidator = Joi.object({
  length: Joi.number().required(),
  height: Joi.number().required(),
  width: Joi.number().required(),
  weight: Joi.number().required(),
  weightUnit: Joi.string()
    .pattern(/(g|kg)/i)
    .required(),
  dimensionsUnit: Joi.string()
    .pattern(/(cm|m)/i)
    .required(),
});

const SpecificationsValidator = Joi.object({
  key: Joi.string().required(),
  value: Joi.string().required(),
});

export const createProductValidator = Joi.object({
  productId: Joi.string().required(),
  slug: Joi.string().required(),
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
  specifications: Joi.array().items(SpecificationsValidator),
});
