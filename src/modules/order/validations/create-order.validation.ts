import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export const createOrderValidation = Joi.object({
  orderId: Joi.string().required(),
  products: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))
    .error(new Error(ResponseMessages.INVALID_OBJECT_ID))
    .required(),
  transferee: Joi.string().required(),
  mobile: Joi.number().required(),
  telephone: Joi.number().required(),
  postalCode: Joi.number().required(),
  address: Joi.string().required(),
  shippingMethod: Joi.string().required(),
  shippingCost: Joi.number().required(),
});
