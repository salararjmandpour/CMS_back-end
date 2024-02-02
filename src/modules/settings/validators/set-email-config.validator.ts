import * as Joi from 'joi';

export const setEmailConfigValidator = Joi.object({
  host: Joi.string(),
  port: Joi.string(),
  user: Joi.string(),
  pass: Joi.string(),
  senderEmail: Joi.string(),
});
