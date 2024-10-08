import * as Joi from 'joi';

export const CategoryValidator = Joi.object({
  value: Joi.object().required(),
});


