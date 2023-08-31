import * as Joi from 'joi';
import {
  objectIdPattern,
  discountDatePattern,
  productUnitPattern,
  productWeightUnit,
  productDimensionsUnit,
} from 'src/core/constants/pattern.constant';

const SizeValidator = Joi.object({
  length: Joi.number().min(0).required(),
  height: Joi.number().min(0).required(),
  width: Joi.number().min(0).required(),
  weight: Joi.number().min(0).required(),
  weightUnit: Joi.string()
    .pattern(productWeightUnit)
    .required()
    .error(new Error('Invalid weightUnit')),
  dimensionsUnit: Joi.string()
    .pattern(productDimensionsUnit)
    .required()
    .error(new Error('Invalid dimensionsUnit')),
});

const SpecificationsValidator = Joi.object({
  key: Joi.string().required(),
  value: Joi.string().required(),
});

export const createProductValidator = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  shortDescription: Joi.string().required(),
  draft: Joi.boolean(),
  category: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))
    .required()
    .error(new Error('category should be array from objectId')),

  // price and discount
  regularPrice: Joi.number().required(),
  discountedPrice: Joi.number(),
  discountDate: Joi.string()
    .pattern(discountDatePattern)
    .error(new Error('Invalid discountDate')),

  // warehouse info
  productId: Joi.string().required(),
  inStock: Joi.boolean().required(),
  shortageInStock: Joi.number().min(0).required(),
  count: Joi.number().min(0).required(),
  warehouseName: Joi.string().required(),
  productUnit: Joi.string()
    .pattern(productUnitPattern)
    .required()
    .error(new Error('Invalid productUnit')),
  warehouseShelfId: Joi.string().required(),

  // linked products
  encourageMorePurchases: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))
    .required()
    .error(new Error('encourageMorePurchases should be array from objectId')),
  similarProducts: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))
    .required()
    .error(new Error('similarProducts should be array from objectId')),

  // specifications product
  specifications: Joi.array().items(SpecificationsValidator),

  //transportation
  size: SizeValidator,
});
