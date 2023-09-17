import * as Joi from 'joi';
import {
  rolesPattern,
  genderPattern,
  persianNationalId,
  jalaliDatePattern,
  nationalityPattern,
} from 'src/core/constants/pattern.constant';
import { createAddressValidator } from './create-address.validator';

export const createUserValidator = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  role: Joi.string().pattern(rolesPattern).required(),
  username: Joi.string(),
  email: Joi.string().email(),
  gender: Joi.string().pattern(genderPattern),
  nationalId: Joi.string().pattern(persianNationalId),
  nationality: Joi.string().pattern(nationalityPattern),
  birthdate: Joi.string().pattern(jalaliDatePattern),
  addresses: Joi.array().items(createAddressValidator),
});
