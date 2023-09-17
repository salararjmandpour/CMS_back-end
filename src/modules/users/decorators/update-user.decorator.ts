import { ApiTags } from '@nestjs/swagger';
import { Patch, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';

import { AuthGuard } from 'src/core/guards/auth.guard';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { updateUserValidator } from '../validator/update-user.validator';

export const UpdateUserDecorator = () => {
  return applyDecorators(Patch(':id'), ApiTags('Users'), UseGuards(AuthGuard));
};
