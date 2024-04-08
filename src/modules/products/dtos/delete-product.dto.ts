import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DeleteProductDto {
  @ApiProperty()
  @IsMongoId({ each: true })
  productIDs: string[];
}
