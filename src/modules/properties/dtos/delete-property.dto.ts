import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class DeletePropertiesDto {
  @ApiProperty()
  @IsMongoId({
    each: true,
  })
  @IsNotEmpty()
  propertyIds: string[];
}
