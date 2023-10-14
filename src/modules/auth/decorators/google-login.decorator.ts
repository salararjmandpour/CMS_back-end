import { applyDecorators, Get, Redirect } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export const GoogleLoginDecorator = () => {
  return applyDecorators(
    ApiOperation({ summary: 'Login with google' }),
    Redirect('https://busy-galileo-rdldetyvg.iran.liara.run'),
    Get('google'),
  );
};
