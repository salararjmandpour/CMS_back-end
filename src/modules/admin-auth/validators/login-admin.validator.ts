import * as joi from 'joi';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

const fieldSchema = joi.alternatives().try(
  joi.string().email(), // email
  joi.string(), // username
);

export const loginAdminValidator = joi.object({
  encryptedData: joi.string().required(),
});
