import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeletDiscountCodeDto {
  @ApiProperty({})
  @IsMongoId({
    each: true,
  })
  @IsNotEmpty()
  ids: string[];
}
