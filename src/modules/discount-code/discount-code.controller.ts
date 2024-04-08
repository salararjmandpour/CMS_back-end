import {
  Get,
  Body,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { DiscountCodeService } from './discount-code.service';
import { DeletDiscountCodeDto } from './dtos/delete-discount-code.dto';
import { CreateDiscountCodeDto } from './dtos/create-discount-code.dto';
import { ApiCreateDiscountCode } from './docs/create-discount-code.doc';
import { UpdateDiscountCodeDto } from './dtos/update-discount-code.dto';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { ApiUpdateDiscountCode } from './docs/update-discount-code.doc';
import { ApiGetDiscountCodeList } from './docs/get-discount-code-list.doc';
import { ApiDeleteDiscountCode } from './docs/delete-discount-code.doc';
import { RequiredPublicSettingsGuard } from 'src/core/guards/public-setting.guard';

@ApiBearerAuth()
@ApiTags('DiscountCode')
@Controller('discount-code')
export class DiscountCodeController {
  constructor(private discountCodeService: DiscountCodeService) {}

  @ApiCreateDiscountCode()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Post()
  createDiscountCode(@Body() body: CreateDiscountCodeDto) {
    return this.discountCodeService.create(body);
  }

  @ApiUpdateDiscountCode()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Patch(':id')
  updateDiscountCode(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateDiscountCodeDto,
  ) {
    return this.discountCodeService.update(id, body);
  }

  @ApiDeleteDiscountCode()
  @UseGuards(AuthGuard, RequiredPublicSettingsGuard)
  @Delete()
  deleteDiscountCode(@Body() body: DeletDiscountCodeDto) {
    return this.discountCodeService.delete(body.ids);
  }

  @ApiGetDiscountCodeList()
  @UseGuards(AuthGuard)
  @Get()
  getDiscountCodeList() {
    return this.discountCodeService.findAll();
  }
}
