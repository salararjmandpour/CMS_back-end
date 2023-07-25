import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetMe } from './docs/get-me.doc';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthGuard } from 'src/core/guards/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @ApiGetMe()
  @Get('@me')
  getMe(@Req() req: Request) {
    return this.usersService.getMe(req);
  }
}
