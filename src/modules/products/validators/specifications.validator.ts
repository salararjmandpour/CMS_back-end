import * as Joi from 'joi';

export const SpecificationsValidator = Joi.object({
  key: Joi.string().required(),
  value: Joi.string().required(),
});
