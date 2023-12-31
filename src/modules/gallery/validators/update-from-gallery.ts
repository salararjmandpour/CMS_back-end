import * as Joi from 'joi';

export const updateFromGalleryValidator = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  alt: Joi.string(),
});
