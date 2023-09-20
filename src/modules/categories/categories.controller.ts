import { Express } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, UploadedFile } from '@nestjs/common';

import { CategoriesService } from './categories.service';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';

import { CreateCategoryDecorator } from './decorators/create-category.decorator';
import { UpdateCategoryDecorator } from './decorators/update-category.decorator';
import { DeleteCategoryDecorator } from './decorators/delete-category.decorator';
import { GetCategoryListDecorator } from './decorators/get-categories-list.decorator';

import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CreateCategoryDto } from './dtos/create-category.dto';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // create category
  @CreateCategoryDecorator()
  create(
    @Body() body: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoriesService.create(file, body);
  }

  // update category by id
  @UpdateCategoryDecorator()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoriesService.update(id, body, file);
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
