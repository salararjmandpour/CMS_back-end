import * as joi from 'joi';
import { mobilePattern } from 'src/core/constants/pattern.constant';

export const getOtpValidation = joi.object({
  mobile: joi.string().length(11).pattern(mobilePattern).required(),
});
