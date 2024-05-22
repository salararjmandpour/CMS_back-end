import {
  Req,
  Body,
  Param,
  Query,
  Controller,
  UploadedFile,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { LabelsService } from './labels.service';

import { UpdateLabelWithDto } from './dtos/update-label.dto';
import { CreateLabelWithSeoDto } from './dtos/create-label.dto';

import { UploadImageDecorator } from './decorators/upload-image.decorator';
import { CreateLabelDecorator } from './decorators/create-label.decorator';
import { UpdateLabelDecorator } from './decorators/update-label.decorator';
import { DeleteLabelDecorator } from './decorators/delete-label.decorator';
import { GetLabelListDecorator } from './decorators/get-labels-list.decorator';

import { joiValidation } from 'src/core/utils/joi-validator.util';
import { GetUser } from 'src/core/decorators/get-user-param.decorator';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { LabelDeleteManyDto } from './dtos/delete-many-label.dto';
import { updateLabelWithSeoValidator } from './validators/update-label.validator';
import { ParseLabelTypePipe } from './pipes/parse-label-type.pipe';

export enum TypeQueryEnum {
  PRODUCT = 'product',
  POST = 'post',
  ALL = 'all',
}

@ApiBearerAuth()
@ApiTags('Labels')
@Controller('labels')
export class LabelsController {
  constructor(private labelsService: LabelsService) {}

  // create label
  @CreateLabelDecorator()
  create(@Body() body: CreateLabelWithSeoDto, @GetUser('_id') _id: string) {
    return this.labelsService.create(_id, body);
  }

  @UploadImageDecorator()
  uploadImage(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Query('label', ParseObjectIdPipe) label: string,
  ) {
    const userId = req.user?._id;
    return this.labelsService.uploadImage(userId, label, file);
  }

  // update label by id
  @UpdateLabelDecorator()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateLabelWithDto,
  ) {
    joiValidation(updateLabelWithSeoValidator, body);
    return this.labelsService.update(id, body);
  }

  // delete many label by IDs
  @DeleteLabelDecorator()
  deleteMany(@Body() body: LabelDeleteManyDto) {
    return this.labelsService.deleteManyByIds(body.categoriesIds);
  }

  // get category list
  @GetLabelListDecorator()
  getCategoryList(
    @Query('search') serach: string,
    @Query('type', ParseLabelTypePipe) type: TypeQueryEnum,
  ) {
    return this.labelsService.getLabelList(type, serach);
  }
}
