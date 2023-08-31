import {
  HttpStatus,
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import imageSize from 'image-size';
import * as moment from 'moment-timezone';

import { FileService } from '../file/file.service';
import { GalleryRepository } from './gallery.repository';
import { AddToGalleryDto } from './dtos/add-to-gallery.dto';
import { getTypeFile } from 'src/core/utils/gallery-type-file';
import { CustomException } from 'src/core/utils/custom-exception.util';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';
import { UpdateFromGalleryDto } from './dtos/update-from-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(
    private fileService: FileService,
    private galleryRepositoy: GalleryRepository,
  ) {}

  async addToGaller(
    file: any,
    body: AddToGalleryDto,
  ): Promise<ResponseFormat<any>> {
    try {
      // check exist file
      if (!file) {
        throw new BadRequestException(ResponseMessages.FILE_IS_REQUIRED);
      }
      const path = file?.path?.replace(/\\/g, '/');
      const type = getTypeFile(file.mimetype) as 'image' | 'video' | 'audio';
      const dimensions = type === 'image' ? imageSize(path) : undefined;
      const size = file.size;

      const createdResult = await this.galleryRepositoy.create({
        ...body,
        path,
        type,
        size,
        dimensions,
      });
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
    } catch (error) {
      if (file) {
        const path = file?.path?.replace(/\\/g, '/');
        this.fileService.deleteFileByPath(path);
      }
      throw new CustomException(error.message, error.status);
    }
  }

  async updateInGallery(
    id: string,
    body: UpdateFromGalleryDto,
    file: Express.Multer.File,
  ): Promise<ResponseFormat<any>> {
    try {
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
      this.fileService.deleteFileByPath(existFile.path);

      const path = file?.path?.replace(/\\/g, '/');
      const type = getTypeFile(file.mimetype) as 'image' | 'video' | 'audio';
      const updatedResult = await this.galleryRepositoy.update(
        id,
        { ...body, path, type },
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
    } catch (error) {
      if (file) {
        const path = file?.path?.replace(/\\/g, '/');
        this.fileService.deleteFileByPath(path);
      }
      throw new CustomException(error.message, error.status);
    }
  }

  async deleteFileInGallery(id: string): Promise<ResponseFormat<any>> {
    // check exist file in galley
    const existFile = await this.galleryRepositoy.findById(id);
    if (!existFile) {
      throw new NotFoundException(ResponseMessages.NOT_FOUND_FILE_IN_GALLERY);
    }

    // delete prev file in file system
    this.fileService.deleteFileByPath(existFile.path);

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

  async getGallery(
    search?: string,
    date?: string | undefined,
    type?: 'image' | 'audio' | 'video' | 'all',
  ): Promise<ResponseFormat<any>> {
    let query: any = {};
    if (type && type !== 'all') query.type = type;
    if (search) query['$text'] = { $search: search };
    if (date) {
      moment();
    }

    var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

    let localTime = moment.utc(date).toDate();

    let local = moment(localTime).format('YYYY-MM-DD HH:mm:ss');

    // console.log({ local, localTime, date });

    const gallery = await this.galleryRepositoy.findAll(query);
    if (!gallery) {
      throw new NotFoundException(ResponseMessages.FAILED_GET_GALLERY);
    }

    return {
      statusCode: HttpStatus.OK,
      data: {
        gallery,
      },
    };
  }
}
