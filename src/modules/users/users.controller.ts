import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiGetMe } from './docs/get-me.doc';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiGetMe()
  @UseGuards(AuthGuard)
  @Get('@me')
  getMe(@Req() req: Request) {
    return this.usersService.getMe(req);
  }
}
