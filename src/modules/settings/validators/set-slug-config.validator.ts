import * as Joi from 'joi';

export const slugValidator = Joi.object({
  category: Joi.string(),
  linkeStructures: Joi.string(),
  link: Joi.string(),
});

export const setSlugConfigValidator = Joi.object({
  postSettings: slugValidator,
  postLableSettings: slugValidator,
  productSettings: slugValidator,
  productLableSettings: slugValidator,
});
