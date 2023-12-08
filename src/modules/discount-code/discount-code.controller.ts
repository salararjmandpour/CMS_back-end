import { Body, Controller } from '@nestjs/common';
import { DiscountCodeService } from './discount-code.service';
import { CreateDiscountCodeDto } from './dtos/create-discount-code.dto';

@Controller('discount-code')
export class DiscountCodeController {
  constructor(private discountCodeService: DiscountCodeService) {}

  createDiscount(@Body() body: CreateDiscountCodeDto) {
    return this.discountCodeService.create(body);
  }
}
