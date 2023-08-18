import { Request } from 'express';
import { Body, Controller, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { CreateProductDecorator } from './decorators/create-product.decorator';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // create product
  @CreateProductDecorator()
  createProduct(@Body() body: CreateProductDto, @Req() req: Request) {
    body.supplier = req?.user?._id;
    return this.productService.create(body);
  }
}
