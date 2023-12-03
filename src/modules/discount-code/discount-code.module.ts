import { Module } from '@nestjs/common';
import { DiscountCodeService } from './discount-code.service';
import { DiscountCodeController } from './discount-code.controller';

@Module({
  providers: [DiscountCodeService],
  controllers: [DiscountCodeController],
})
export class DiscountCodeModule {}
