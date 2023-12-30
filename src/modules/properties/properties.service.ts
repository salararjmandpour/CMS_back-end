import {
  HttpStatus,
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PropertiesRepository } from './properties.repository';
import { CreatePropertyDto } from './dtos/create-property.dto';
import { UpdatePropertyDto } from './dtos/update-property.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { ResponseMessages } from 'src/core/constants/response-messages.constant';

@Injectable()
export class PropertiesService {
  constructor(private propertiesRepository: PropertiesRepository) {}

  async createProperty(body: CreatePropertyDto): Promise<ResponseFormat<any>> {
    // prevented duplicated slug
    const duplicatedSlug = await this.propertiesRepository.findOne({
      slug: body.slug,
    });
    if (duplicatedSlug) {
      throw new ConflictException(ResponseMessages.PROPERTY_SLUG_ALREADY_EXIST);
    }

    const createdProperty = await this.propertiesRepository.create(body);
    if (!createdProperty) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_CREATE_PROPERTY,
      );
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: ResponseMessages.PROPERTY_CREATED_SUCCESS,
    };
  }

  async updateProperty(
    _id: string,
    body: UpdatePropertyDto,
  ): Promise<ResponseFormat<any>> {
    // prevented duplicated slug
    const duplicatedSlug = await this.propertiesRepository.findOne({
      slug: body.slug,
    });

    if (duplicatedSlug && duplicatedSlug._id.toString() !== _id) {
      throw new ConflictException(ResponseMessages.PROPERTY_SLUG_ALREADY_EXIST);
    }

    const updatedResult = await this.propertiesRepository.updateOne(
      { _id },
      body,
    );
    if (updatedResult.modifiedCount !== 1) {
      throw new InternalServerErrorException(
        ResponseMessages.FAILED_UPDATE_PROPERTY,
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessages.PROPERTY_UPDATED_SUCCESS,
    };
  }
}
