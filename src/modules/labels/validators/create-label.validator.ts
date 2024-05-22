import * as Joi from 'joi';
import {
  objectIdPattern,
  labelTypePattern,
} from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { createSeoValidator } from 'src/modules/seo/validators/create-seo-validator';

export const labelValidator = Joi.object({
  name: Joi.string().required(),
  description: Joi.object().required(),
  slug: Joi.string().required(),
  image: Joi.string(),
  type: Joi.string().pattern(labelTypePattern).required(),

});

export const createLabelValidator = Joi.object({
  label: labelValidator,
  seo: createSeoValidator,
});
