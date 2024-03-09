import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeleteLabelsDto {
  @ApiProperty()
  @IsMongoId({
    each: true,
  })
  @IsNotEmpty()
  labelIds: string[];
}
