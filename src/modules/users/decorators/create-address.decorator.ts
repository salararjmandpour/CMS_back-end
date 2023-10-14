import { ApiTags } from '@nestjs/swagger';
import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCreateAddress } from '../docs/create-address.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createAddressValidator } from '../validator/create-address.validator';

export const CreateAddressDecorator = () => {
  return applyDecorators(
    Post('address'),
    ApiTags('Profile'),
    ApiCreateAddress(),
    UseGuards(AuthGuard),
    UsePipes(new JoiValidatorPipe(createAddressValidator)),
  );
};
