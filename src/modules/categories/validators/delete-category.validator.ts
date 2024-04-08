import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';

export const deleteCategoryValdator = Joi.object({
  categoriesIds: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))
    .required()
    .error(new Error('categoriesIds should be array from objectIds')),
});
