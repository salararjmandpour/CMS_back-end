import { applyDecorators, Get, Redirect } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const GoogleLoginDecorator = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Login with google' }),
    Redirect('http://localhost:5173'),
    Get('google'),
  );
};
