import { ApiTags } from '@nestjs/swagger';
import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiCreateAddress } from '../docs/create-address.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createAddressValidator } from '../validator/create-address.validator';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

export const CreateAddressDecorator = () => {
  return applyDecorators(
    Post('address'),
    ApiTags('Profile'),
    ApiCreateAddress(),
    UseGuards(AuthGuard, RequiredPublicSettingsGuard),
    UsePipes(new JoiValidatorPipe(createAddressValidator)),
  );
};
