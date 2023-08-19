import { Body, Controller } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CreateCategoryDecorator } from './decorators/create-category.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @CreateCategoryDecorator()
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.create(body);
  }
}
