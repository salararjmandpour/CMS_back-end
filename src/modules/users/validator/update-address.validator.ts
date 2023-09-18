import * as Joi from 'joi';
import {
  mobilePattern,
  telephonePattern,
  postalCodePattern,
} from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const updateAddressValidator = Joi.object({
  first_name: Joi.string(),
  last_name: Joi.string(),
  mobile: Joi.string()
    .pattern(mobilePattern)
    .error(new Error(ResponseMessages.INVALID_MOBILE_FORMAT)),
  telephone: Joi.string()
    .pattern(telephonePattern)
    .error(new Error(ResponseMessages.INVALID_TELEPHONE_FORMAT)),
  titleAddress: Joi.string(),
  state: Joi.string(),
  city: Joi.string(),
  postalAddress: Joi.string(),
  postalCode: Joi.string()
    .pattern(postalCodePattern)
    .error(new Error(ResponseMessages.INVALID_POSTAL_CODE)),
});
