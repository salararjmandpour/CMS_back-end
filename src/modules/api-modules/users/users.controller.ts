import { Request } from 'express';
import { Controller, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { GetMeDecorator } from './decorators/get-me.decorator';
import { UploadAvatarDecorator } from './decorators/upload-avatar.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @GetMeDecorator()
  getMe(@Req() req: Request) {
    return this.usersService.getMe(req);
  }

  @UploadAvatarDecorator()
  uploadAvatar() {
    
  }
}
