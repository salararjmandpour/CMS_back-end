import { Body, Controller, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { CreateCategoryDecorator } from './decorators/create-category.decorator';
import { UpdateCategoryDecorator } from './decorators/update-category.decorator';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // create category
  @CreateCategoryDecorator()
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }

  // update category by id
  @UpdateCategoryDecorator()
  update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: CreateCategoryDto,
  ) {
    return this.categoriesService.update(id, body);
  }
}
