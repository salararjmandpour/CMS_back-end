import * as Joi from 'joi';

export const LabelsValidator = Joi.object({
  value: Joi.object().required(),
});


