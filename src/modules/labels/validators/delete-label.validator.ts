import * as Joi from 'joi';
import { objectIdPattern } from 'src/core/constants/pattern.constant';

export const deleteLabelValidator = Joi.object({
  labelsIds: Joi.array()
    .items(Joi.string().pattern(objectIdPattern))
    .required()
    .error(new Error('labelsIds should be array from objectIds')),
});
