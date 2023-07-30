import * as joi from 'joi';

export const refreshTokenValidation = joi.object({
  refreshToken: joi.string().required(),
});
