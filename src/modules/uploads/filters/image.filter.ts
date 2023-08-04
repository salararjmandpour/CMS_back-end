import { BadRequestException } from '@nestjs/common';
import { FileFilterCallback } from 'multer';
import { Request } from 'express';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

export function imageFilter(req: Request, file: any, cb: FileFilterCallback) {
  const maxSize = 1024 * 1024 * 2; // 2MB
  if (file.size > maxSize) {
    cb(new BadRequestException(ResponseMessages.FILE_SIZE_TOO_LARGE));
  }
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new BadRequestException(ResponseMessages.INVALID_FILE_FORMAT));
  }
  cb(null, true);
}
