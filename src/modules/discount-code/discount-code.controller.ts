import {
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
import { CreateDiscountCodeDto } from './dtos/create-discount-code.dto';
import { ApiCreateDiscountCode } from './docs/create-discount-code.doc';
import { UpdateDiscountCodeDto } from './dtos/update-discount-code.dto';
import { ParseObjectIdPipe } from 'src/core/pipes/parse-object-id.pipe';
import { DeletDiscountCodeDto } from './dtos/delete-discount-code.dto';

@ApiBearerAuth()
@ApiTags('DiscountCode')
@Controller('discount-code')
export class DiscountCodeController {
  constructor(private discountCodeService: DiscountCodeService) {}

  @ApiCreateDiscountCode()
  @UseGuards(AuthGuard)
  @Post()
  createDiscountCode(@Body() body: CreateDiscountCodeDto) {
    return this.discountCodeService.create(body);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateDiscountCode(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateDiscountCodeDto,
  ) {
    return this.discountCodeService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @Delete()
  deleteDiscountCode(@Body() body: DeletDiscountCodeDto) {
    return this.discountCodeService.delete(body.ids);
  }
}
