import * as Joi from 'joi';
import {
  rolesPattern,
  objectIdPattern,
} from 'src/core/constants/pattern.constant';

export const changeUsersRoleValidator = Joi.object({
  role: Joi.string()
    .pattern(rolesPattern)
    .required()
    .error(new Error('invalid role')),
  usersIds: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))
    .required()
    .error(new Error('usersIds should be array from objectId')),
});
