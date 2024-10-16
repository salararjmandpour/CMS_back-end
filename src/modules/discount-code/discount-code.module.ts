import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountCodeService } from './discount-code.service';
import { DiscountCodeController } from './discount-code.controller';
import { DiscountCodeRepository } from './discount-code.repository';
import {
  DiscountCode,
  DiscountCodeSchema,
} from './schemas/discount-code.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DiscountCode.name, schema: DiscountCodeSchema },
    ]),
  ],
  providers: [DiscountCodeService, DiscountCodeRepository],
  controllers: [DiscountCodeController],
})
export class DiscountCodeModule {}
