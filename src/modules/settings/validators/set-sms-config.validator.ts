import * as Joi from 'joi';

export const setSmsConfigValidator = Joi.object({
  panel: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  senderNumber: Joi.string().required(),
});
