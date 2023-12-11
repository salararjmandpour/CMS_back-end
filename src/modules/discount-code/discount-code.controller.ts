import {
  Body,
  Post,
  Param,
  Patch,
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

@ApiBearerAuth()
@ApiTags('DiscountCode')
@Controller('discount-code')
export class DiscountCodeController {
  constructor(private discountCodeService: DiscountCodeService) {}

  @ApiCreateDiscountCode()
  @UseGuards(AuthGuard)
  @Post()
  createDiscount(@Body() body: CreateDiscountCodeDto) {
    return this.discountCodeService.create(body);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  updateDiscount(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() body: UpdateDiscountCodeDto,
  ) {
    return this.discountCodeService.update(id, body);
  }
}
