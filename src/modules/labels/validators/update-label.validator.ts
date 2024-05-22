import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { createSeoValidator } from 'src/modules/seo/validators/create-seo-validator';

export const updateLabelValidator = Joi.object({
  name: Joi.string(),
  description: Joi.object(),
  slug: Joi.string(),
  image: Joi.string(),
});

export const updateLabelWithSeoValidator = Joi.object({
  label: updateLabelValidator,
  seo: createSeoValidator,
});
