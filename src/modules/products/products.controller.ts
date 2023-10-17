import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Param, Query, Controller, UploadedFiles } from '@nestjs/common';

import { ProductsService } from './products.service';

import { UpdateProductWithSeoDto } from './dtos/update-product.dto';
import { CreateProductWithCeoDto } from './dtos/create-product.dto';

import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';

import { GetUser } from 'src/core/decorators/get-user-param.decorator';
import { GetProductDecoratpr } from './decorators/get-product.decorator';
import { GetProductsDecorator } from './decorators/get-products.decorator';
import { UploadImagesDecorator } from './decorators/upload-images.decorator';
import { UpdateProductDecorator } from './decorators/update-product.decorator';
import { CreateProductDecorator } from './decorators/create-product.decorator';
import { joiValidation } from 'src/core/utils/joi-validator.util';
import { updateProductWithDeoValidator } from './validators/update-product.validator';

@ApiBearerAuth()
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // create product
  @CreateProductDecorator()
  createProduct(
    @Body() body: CreateProductWithCeoDto,
    @GetUser('_id') _id: string,
  ) {
    return this.productService.create(_id, body);
  }

  // get one product by ID
  @GetProductDecoratpr()
  getProduct(@Param('id', ParseObjectIdPipe) id: string) {
    return this.productService.findById(id);
  }

  // get product list
  @GetProductsDecorator()
  getProducts(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ) {
    return this.productService.getProductList(+page, +limit, search);
  }

  // update product by product id
  @UpdateProductDecorator()
  updateProduct(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateProductWithSeoDto,
  ) {
    joiValidation(updateProductWithDeoValidator, body);
    return this.productService.update(id, body);
  }

  @UploadImagesDecorator()
  uploadImages(
    @Param('id', ParseObjectIdPipe) id: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.uploadImages(id, files);
  }
}
