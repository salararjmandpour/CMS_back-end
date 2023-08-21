import { Post, UseGuards, UsePipes, applyDecorators } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createOrderValidation } from '../validations/create-order.validation';

export const CreateOrderDecorator = () => {
  return applyDecorators(
    Post(),
    UseGuards(AuthGuard),
    UsePipes(new JoiValidatorPipe(createOrderValidation)),
  );
};
