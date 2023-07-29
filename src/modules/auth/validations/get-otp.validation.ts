import * as joi from 'joi';
import { mobilePattern } from 'src/core/constants/pattern.constant';

const emailOrMobileSchema = joi.alternatives().try(
  joi.string().email(), // email
  joi.string().length(11).pattern(mobilePattern), // mobile (should be 11-digit)
);

export const getOtpValidation = joi.object({
  field: emailOrMobileSchema
    .required()
    .error(new Error('field shold be mobile or email')),
});
