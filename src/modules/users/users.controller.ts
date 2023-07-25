import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiGetMe } from './docs/get-me.doc';
import { UsersService } from './users.service';
import { Request } from 'express';
import { AuthGuard } from 'src/core/guards/auth.guard';

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
