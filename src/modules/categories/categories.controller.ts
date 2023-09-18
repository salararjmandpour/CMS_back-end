import { Body, Controller, Param, UploadedFile } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';

import { CreateCategoryDecorator } from './decorators/create-category.decorator';
import { UpdateCategoryDecorator } from './decorators/update-category.decorator';
import { DeleteCategoryDecorator } from './decorators/delete-category.decorator';
import { GetCategoryListDecorator } from './decorators/get-categories-list.decorator';
import { Express } from 'express';

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
    @Body() body: CreateCategoryDto,
  ) {
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
