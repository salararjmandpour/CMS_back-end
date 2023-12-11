import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { DiscountCodeService } from './discount-code.service';
import { CreateDiscountCodeDto } from './dtos/create-discount-code.dto';
import { ApiCreateDiscountCode } from './docs/create-discount-code.doc';

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
}
