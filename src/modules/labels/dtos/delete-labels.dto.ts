import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteSublabelsDto {
  @ApiProperty()
  @IsMongoId({
    each: true,
  })
  @IsNotEmpty()
  sublabelIDs: string[];
}
