import {
  HttpStatus,
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LabelsRepository } from './labels.repository';
import { CreateLabelDto } from './dtos/create-label.dto';

@Injectable()
export class LabelsService {
  constructor(private labelsRepository: LabelsRepository) {}

  async createLabel(body: CreateLabelDto) {
    // prevented duplicated slug
    const duplicatedSlug = await this.labelsRepository.findOne({
      slug: body.slug,
    });

    if (duplicatedSlug) {
      throw new ConflictException('LABEL_SLUG_ALREADY_EXIST');
    }

    const createdLabel = await this.labelsRepository.createLabel(body);
    if (!createdLabel) {
      throw new InternalServerErrorException('FAILED_CREATE_LABEL');
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'LABEL_CREATED_SUCCESS',
    };
  }
}
