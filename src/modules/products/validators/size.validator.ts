import * as Joi from 'joi';
import {
  productWeightUnit,
  productDimensionsUnit,
} from 'src/core/constants/pattern.constant';

export const createSizeValidator = Joi.object({
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

export const updateSizeValidator = Joi.object({
  length: Joi.number().min(0),
  height: Joi.number().min(0),
  width: Joi.number().min(0),
  weight: Joi.number().min(0),
  weightUnit: Joi.string()
    .pattern(productWeightUnit)
    .error(new Error('Invalid weightUnit')),
  dimensionsUnit: Joi.string()
    .pattern(productDimensionsUnit)
    .error(new Error('Invalid dimensionsUnit')),
});
