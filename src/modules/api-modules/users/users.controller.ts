import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { UsersService } from './users.service';
import { GetMeDecorator } from './decorators/get-me.decorator';
import { UploadAvatarDecorator } from './decorators/upload-avatar.decorator';
import { ApiFile } from 'src/core/decorators/api-file.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFilter } from 'src/core/utils/image-filter.util';
import { fileStorage } from 'src/core/utils/upload-storage.util';

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
  uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    return this.usersService.uploadAvatar(file, req);
  }
}
