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

import { CategoriesService } from './categories.service';

import { UpdateCategoryWithDto } from './dtos/update-category.dto';
import { CreateCategoryWithSeoDto } from './dtos/create-category.dto';

import { UploadImageDecorator } from './decorators/upload-image.decorator';
import { CreateCategoryDecorator } from './decorators/create-category.decorator';
import { UpdateCategoryDecorator } from './decorators/update-category.decorator';
import { DeleteCategoryDecorator } from './decorators/delete-category.decorator';
import { GetCategoryListDecorator } from './decorators/get-categories-list.decorator';

import { joiValidation } from 'src/core/utils/joi-validator.util';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { updateCategoryWithSeoValidator } from './validators/update-category.validator';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // create category
  @CreateCategoryDecorator()
  create(@Body() body: CreateCategoryWithSeoDto) {
    return this.categoriesService.create(body);
  }

  @UploadImageDecorator()
  uploadImage(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Query('category', ParseObjectIdPipe) category: string,
  ) {
    const userId = req.user?._id;
    return this.categoriesService.uploadImage(userId, category, file);
  }

  // update category by id
  @UpdateCategoryDecorator()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateCategoryWithDto,
  ) {
    joiValidation(updateCategoryWithSeoValidator, body);
    return this.categoriesService.update(id, body);
  }

  // delete category by id
  @DeleteCategoryDecorator()
  deleteById(@Param('id', ParseObjectIdPipe) id: string) {
    return this.categoriesService.deleteById(id);
  }

  // get category list
  @GetCategoryListDecorator()
  getCategoryList() {
    return this.categoriesService.getCategoryList();
  }
}
