import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteCharacteristicDto {
  @ApiProperty()
  @IsMongoId({
    each: true,
  })
  @IsNotEmpty()
  characteristicIDs: string[];
}
