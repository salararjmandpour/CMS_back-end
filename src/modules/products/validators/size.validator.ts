import * as Joi from 'joi';
import {
  productDimensionsUnit,
  productWeightUnit,
} from 'src/core/constants/pattern.constant';

export const SizeValidator = Joi.object({
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
