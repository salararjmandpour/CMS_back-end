import * as Joi from 'joi';
import {
  rolesPattern,
  genderPattern,
  persianNationalId,
  jalaliDatePattern,
  nationalityPattern,
} from 'src/core/constants/pattern.constant';
import { updateAddressValidator } from './update-address.validator';

export const updateUserValidator = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  role: Joi.string().pattern(rolesPattern),
  username: Joi.string(),
  email: Joi.string().email(),
  gender: Joi.string().pattern(genderPattern),
  nationalId: Joi.string().pattern(persianNationalId),
  nationality: Joi.string().pattern(nationalityPattern),
  birthdate: Joi.string().pattern(jalaliDatePattern),
  addresses: Joi.array().items(updateAddressValidator),
});
