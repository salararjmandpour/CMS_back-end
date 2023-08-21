import * as Joi from 'joi';
import {
  objectIdPattern,
  paymentStatusPattern,
} from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const createOrderValidation = Joi.object({
  products: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))
    .error(new Error(ResponseMessages.INVALID_OBJECT_ID))
    .required(),
  address: Joi.string().pattern(objectIdPattern).required(),
  shippingMethod: Joi.string().required(),
  shippingCost: Joi.number().required(),
  paymentStatus: Joi.string().pattern(paymentStatusPattern).required(),
});
