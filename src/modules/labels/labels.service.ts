import {
  HttpStatus,
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { LabelsRepository } from './labels.repository';
import { CreateLabelDto } from './dtos/create-label.dto';
import { UpdateLabelDto } from './dtos/update-label.dto';
import { ResponseFormat } from 'src/core/interfaces/response.interface';
import { DeleteLabelsDto } from './dtos/delete-label.dto';
import { CreateSublabelDto } from './dtos/create-sublabel.dto';

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

  public async updateLabel(
    _id: string,
    body: UpdateLabelDto,
  ): Promise<ResponseFormat<any>> {
    // prevented duplicated slug
    const duplicatedSlug = await this.labelsRepository.findOne({
      slug: body.slug,
    });

    if (duplicatedSlug && duplicatedSlug._id.toString() !== _id) {
      throw new ConflictException('LABEL_SLUG_ALREADY_EXIST');
    }

    const updatedResult = await this.labelsRepository.updateOne({ _id }, body);
    if (updatedResult.modifiedCount !== 1) {
      throw new InternalServerErrorException('FAILED_UPDATE_LABEL');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'LABEL_UPDATED_SUCCESS',
    };
  }

  public async deleteLabel(
    body: DeleteLabelsDto,
  ): Promise<ResponseFormat<any>> {
    const existedLabel = await this.labelsRepository.findManyByIds(
      body.labelIds,
    );
    if (existedLabel.length !== body.labelIds.length) {
      throw new NotFoundException('NOT_FOUNDS_LABELS');
    }

    const deletedResult = await this.labelsRepository.deleteManyByIds(
      body.labelIds,
    );
    if (deletedResult.deletedCount !== body.labelIds.length) {
      throw new InternalServerErrorException('FAILED_DELETE_LABELS');
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'LABEL_DELETED_SUCCESS',
    };
  }

  public async findAllLabels(): Promise<ResponseFormat<any>> {
    const labels = await this.labelsRepository.find();

    return {
      statusCode: HttpStatus.OK,
      data: {
        labels,
      },
    };
  }

  public async createSublabels(
    labelId: string,
    body: CreateSublabelDto,
  ): Promise<ResponseFormat<any>> {
    // prevented duplicated slug
    const [existLabel, duplicatedSlug] = await Promise.all([
      this.labelsRepository.findOne({ _id: labelId }),
      this.labelsRepository.findSublabelBySlug(labelId, body.slug),
    ]);
    if (!existLabel) {
      throw new NotFoundException('NOT_FOUND_LABEL');
    }
    if (duplicatedSlug) {
      throw new ConflictException('SUBLABELS_SLUG_ALREADY_EXIST');
    }

    const craetedResult = await this.labelsRepository.createSublabel(
      labelId,
      body,
    );

    if (!craetedResult) {
      throw new InternalServerErrorException('FAILED_CREATE_SUBLABELS');
    }

    return {
      statusCode: HttpStatus.CREATED,
      message: 'SUBLABELS_CREATED_SUCCESS',
    };
  }
}
