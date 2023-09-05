import * as Joi from 'joi';

export const addToGallery = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  alt: Joi.string().required(),
});
