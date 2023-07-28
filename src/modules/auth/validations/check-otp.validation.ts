import * as joi from 'joi';
import { mobilePattern } from 'src/core/constants/pattern.constant';

export const checkOtpSchema = joi.object({
  mobile: joi.string().length(11).pattern(mobilePattern).required(),
  code: joi.string().length(6).required(),
});
