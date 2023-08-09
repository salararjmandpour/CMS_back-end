import * as joi from 'joi';

export const refreshTokenValidator = joi.object({
  refreshToken: joi.string().required(),
});
