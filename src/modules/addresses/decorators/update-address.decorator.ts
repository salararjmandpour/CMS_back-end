import { Patch, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiUpdateAddress } from '../docs/update-address.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { updateAddressValidator } from '../validators/update-address.validator';

export const UpdateAddressDecorator = () => {
  return applyDecorators(
    Patch(':id'),
    UseGuards(AuthGuard),
    ApiUpdateAddress(),
    UsePipes(new JoiValidatorPipe(updateAddressValidator)),
  );
};
