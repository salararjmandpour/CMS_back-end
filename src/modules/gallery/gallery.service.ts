import {
  HttpStatus,
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { FileService } from '../file/file.service';
import { GalleryRepository } from './gallery.repository';
import { getTypeFile } from 'src/core/utils/gallery-type-file';
import { fileExtensions } from 'src/core/constants/gallery-extname';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class GalleryService {
  constructor(
    private fileService: FileService,
    private galleryRepositoy: GalleryRepository,
  ) {}

  async addToGaller(file: Express.Multer.File): Promise<ResponseFormat<any>> {
    // check exist file
    if (!file) {
      throw new BadRequestException(ResponseMessages.FILE_IS_REQUIRED);
    }

    const fileAddress = file?.path?.replace(/\\/g, '/');
    const extname = this.fileService.getExtname(file.filename);
    const fileType = getTypeFile(fileExtensions, extname);

    const createdResult = await this.galleryRepositoy.create(
      fileAddress,
      fileType,
    );
    if (!createdResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_ADD_TO_GALLERY,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.FILE_ADDED_TO_GALLERY,
      data: {
        file: createdResult,
      },
    };
  }
}
