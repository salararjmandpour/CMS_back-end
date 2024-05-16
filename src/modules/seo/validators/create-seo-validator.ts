import * as Joi from 'joi';

// create seo schema for product
export const createSeoValidator = Joi.object({
  title: Joi.array().items(Joi.string().empty('').optional()),
  slug: Joi.string().empty(''),
  description: Joi.object(),
});
