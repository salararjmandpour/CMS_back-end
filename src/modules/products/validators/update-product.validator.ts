import * as Joi from 'joi';
import { updateSizeValidator } from './size.validator';
import { SpecificationsValidator } from './specifications.validator';
import { updateSeoValidator } from 'src/modules/seo/validators/update-seo-validator';
import {
  objectIdPattern,
  productUnitPattern,
  discountDatePattern,
  productSmsStatusPattern,
} from 'src/core/constants/pattern.constant';
import { CategoryValidator } from './category.validator';
import { LabelsValidator } from './labels.validator';

export const updateProductValidator = Joi.object({
  title: Joi.string(),
  slug: Joi.string(),
  productId: Joi.string(),
  description: Joi.object(),
  shortDescription: Joi.object(),
  draft: Joi.boolean(),
  category: Joi.array()
    .items(CategoryValidator)
    .required()
    .error(new Error('category should be array from objectId')),
  image: Joi.string(),
  images: Joi.array().items(Joi.string()),

  // price and discount
  regularPrice: Joi.number(),
  discountedPrice: Joi.number(),
  discountStartDate: Joi.string(),
  //   .pattern(discountDatePattern)
  //   .error(new Error('Invalid discountStartDate')),
  // discountEndDate: Joi.string()
  //   .pattern(discountDatePattern)
  //   .error(new Error('Invalid discountEndDate')),

  // warehouse info
  inStock: Joi.boolean(),
  shortageInStock: Joi.number().min(0),
  count: Joi.number().min(0),
  warehouseName: Joi.string(),
  productUnit: Joi.string()
    .pattern(productUnitPattern)

    .error(new Error('Invalid productUnit')),
  warehouseShelfId: Joi.string(),

  // linked products
  encourageMorePurchases: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))

    .error(new Error('encourageMorePurchases should be array from objectId')),
  similarProducts: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))

    .error(new Error('similarProducts should be array from objectId')),

  // specifications product
  specifications: Joi.array().items(SpecificationsValidator),
  labels: Joi.array().items(LabelsValidator),

  //transportation
  size: updateSizeValidator,

  // sms
  sms: Joi.array().items(
    Joi.object({
      status: Joi.string().pattern(productSmsStatusPattern).allow(''),
      title: Joi.string().allow(''),
      message: Joi.string().allow(''),
      isActive: Joi.boolean().allow(''),
    }),
  ),

  review: Joi.boolean(),
});

export const updateProductWithDeoValidator = Joi.object({
  product: updateProductValidator,
  seo: updateSeoValidator,
});
