import * as Joi from 'joi';

export const SizeValidator = Joi.object({
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

export const SpecificationsValidator = Joi.object({
  key: Joi.string().required(),
  value: Joi.string().required(),
});
