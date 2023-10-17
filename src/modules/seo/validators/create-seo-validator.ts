import * as Joi from 'joi';

// create seo schema for product
export const createSeoValidator = Joi.object({
  title: Joi.array().items(Joi.string().empty('')),
  slug: Joi.string().empty(''),
  description: Joi.string().empty(''),
});
