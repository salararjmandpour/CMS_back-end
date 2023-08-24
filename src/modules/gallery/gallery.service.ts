import {
  HttpStatus,
  Injectable,
  NotFoundException,
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

  async updateInGallery(
    id: string,
    file: Express.Multer.File,
  ): Promise<ResponseFormat<any>> {
    // check exist file
    if (!file) {
      throw new BadRequestException(ResponseMessages.FILE_IS_REQUIRED);
    }

    // check exist file in galley
    const existFile = await this.galleryRepositoy.findById(id);
    if (!existFile) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_FILE_IN_GALLERY);
    }

    // delete prev file
    this.fileService.deleteFileByPath(existFile.src);

    const src = file?.path?.replace(/\\/g, '/');
    const extname = this.fileService.getExtname(file.filename);
    const type = getTypeFile(fileExtensions, extname);

    const updatedResult = await this.galleryRepositoy.update(
      id,
      { src, type },
      { new: true },
    );
    if (!updatedResult) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_FILE_IN_GALLERY,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.FILE_UPDATED_IN_GALLERY,
      data: {
        file: updatedResult,
      },
    };
  }

  async deleteFileInGallery(id: string): Promise<ResponseFormat<any>> {
    // check exist file in galley
    const existFile = await this.galleryRepositoy.findById(id);
    if (!existFile) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_FILE_IN_GALLERY);
    }

    // delete prev file in file system
    this.fileService.deleteFileByPath(existFile.src);

    // delete file in database
    const deleteResult = await this.galleryRepositoy.deleteById(id);
    if (deleteResult.deletedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_DELETE_FILE_IN_GALLERY,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.FILE_DELETED_IN_GALLERY,
    };
  }
}
