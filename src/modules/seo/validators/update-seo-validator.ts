import * as Joi from 'joi';

// create seo schema for product
export const updateSeoValidator = Joi.object({
  title: Joi.array().items(Joi.string().required()),
  slug: Joi.string(),
  description: Joi.string(),
});
