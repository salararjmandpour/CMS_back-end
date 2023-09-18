import * as Joi from 'joi';
import {
  mobilePattern,
  telephonePattern,
  postalCodePattern,
} from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const addressValidator = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  mobile: Joi.string()
    .pattern(mobilePattern)
    .required()
    .error(new Error(ResponseMessages.INVALID_MOBILE_FORMAT)),
  telephone: Joi.string()
    .pattern(telephonePattern)
    .required()
    .error(new Error(ResponseMessages.INVALID_TELEPHONE_FORMAT)),
  titleAddress: Joi.string().required(),
  state: Joi.string().required(),
  city: Joi.string().required(),
  postalAddress: Joi.string().required(),
  postalCode: Joi.string()
    .pattern(postalCodePattern)
    .required()
    .error(new Error(ResponseMessages.INVALID_POSTAL_CODE)),
});
