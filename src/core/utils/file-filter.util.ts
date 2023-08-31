import { Request } from 'express';
import { FileFilterCallback } from 'multer';
import { BadRequestException } from '@nestjs/common';
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

export function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) {
  const maxSize = 1024 * 1024 * 10; // 10MB

  if (file.size > maxSize) {
    return cb(new BadRequestException(ResponseMessages.FILE_SIZE_TOO_LARGE));
  }

  const allowedFormats = /\.(jpg|jpeg|png|mkv|mp4|mp3)$/;

  if (!file.originalname.match(allowedFormats)) {
    return cb(new BadRequestException(ResponseMessages.INVALID_FILE_FORMAT));
  }

  cb(null, true);
}
