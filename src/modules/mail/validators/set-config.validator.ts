import * as Joi from 'joi';

export const setConfigValidator = Joi.object({
  host: Joi.string().required(),
  port: Joi.string().required(),
  user: Joi.string().required(),
  pass: Joi.string().required(),
  senderEmail: Joi.string().required(),
  _id: Joi.string(),
});
