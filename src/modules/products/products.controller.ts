import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Param, Req } from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { GetProductDecoratpr } from './decorators/get-product.decorator';
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

  // get one product by ID
  @GetProductDecoratpr()
  getProduct(@Param('id', ParseObjectIdPipe) id: string) {
    return this.productService.findById(id);
  }
}
