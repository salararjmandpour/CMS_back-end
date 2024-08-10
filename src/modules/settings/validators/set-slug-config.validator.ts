import * as Joi from 'joi';

export const slugValidator = Joi.object({
  category: Joi.string(),
  linkStructures: Joi.string(),
  link: Joi.string(),
});

export const setSlugConfigValidator = Joi.object({
  postSettings: slugValidator,
  postLabelSettings: slugValidator,
  productSettings: slugValidator,
  productLabelSettings: slugValidator,
});
