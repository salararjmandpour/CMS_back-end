import * as Joi from 'joi';
import {
  objectIdPattern,
  productUnitPattern,
  discountDatePattern,
  productSmsStatusPattern,
} from 'src/core/constants/pattern.constant';
import { createSizeValidator } from './size.validator';
import { SpecificationsValidator } from './specifications.validator';
import { createSeoValidator } from 'src/modules/seo/validators/create-seo-validator';

export const createProductValidator = Joi.object({
  title: Joi.string().required(),
  slug: Joi.string().required(),
  description: Joi.array().required(),
  shortDescription: Joi.string().required(),
  draft: Joi.boolean(),
  category: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))
    .required()
    .error(new Error('category should be array from objectId')),
  image: Joi.string(),
  images: Joi.array().items(Joi.string()),

  // price and discount
  regularPrice: Joi.number().required(),
  discountedPrice: Joi.number(),
  discountStartDate: Joi.string()
    .pattern(discountDatePattern)
    .error(new Error('Invalid discountStartDate')),
  discountEndDate: Joi.string()
    .pattern(discountDatePattern)
    .error(new Error('Invalid discountEndDate')),

  // warehouse info
  productId: Joi.string(),
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
  size: createSizeValidator,

  // sms
  sms: Joi.array().items(
    Joi.object({
      status: Joi.string().pattern(productSmsStatusPattern).allow(''),
      title: Joi.string().allow(''),
      message: Joi.string().allow(''),
      isActive: Joi.boolean().allow(''),
    }),
  ),
});

export const createProductWithDeoValidator = Joi.object({
  product: createProductValidator,
  seo: createSeoValidator,
});
