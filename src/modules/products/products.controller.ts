import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Param,
  Query,
  Controller,
  UploadedFiles,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';

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
import { SearchByTitleDoc } from './docs/search-product-by-title.doc';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';
import { DeleteProductDto } from './dtos/delete-product.dto';

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

  // search products by title
  @SearchByTitleDoc()
  @ApiQuery({ name: 'title', required: false })
  @Get('/search')
  searchProductsByTitle(@Query('title') title: string) {
    return this.productService.searchByTitle(title);
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


  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Delete()
  deleteMany(@Body() body: DeleteProductDto) {
    return this.productService.deleteMany(body.productIDs);
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
