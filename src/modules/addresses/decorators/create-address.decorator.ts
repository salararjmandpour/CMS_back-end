import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCreateAddress } from '../docs/create-address.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createAddressValidator } from '../validators/create-address.validator';

export const CreateAddressDecorator = () => {
  return applyDecorators(
    Post(),
    UseGuards(AuthGuard),
    ApiCreateAddress(),
    UsePipes(new JoiValidatorPipe(createAddressValidator)),
  );
};
