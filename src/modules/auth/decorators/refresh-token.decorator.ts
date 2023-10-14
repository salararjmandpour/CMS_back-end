import { Post, UsePipes, applyDecorators } from '@nestjs/common';
import { ApiRefreshToken } from '../docs/refresh-token.doc';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { refreshTokenValidator } from '../validators/refresh-token.validator';

export const RefreshTokenDecorator = () => {
  return applyDecorators(
    ApiRefreshToken(),
    Post('refresh-token'),
    UsePipes(new JoiValidatorPipe(refreshTokenValidator)),
  );
};
