import * as Joi from 'joi';

// create seo schema for product
export const createSeoValidator = Joi.object({
  title: Joi.array().items(Joi.string().required()).required(),
  slug: Joi.string().required(),
  description: Joi.string().required(),
});
