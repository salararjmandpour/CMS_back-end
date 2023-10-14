import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId } from 'class-validator';

export class DeleteManyInGalleryDto {
  @ApiProperty({
    type: Array<String>,
    required: true,
    default: ['64f6f9bd215ac8be4286eab4', '64f06cdf27d8e88ac1089a8f'],
  })
  @IsArray()
  @IsMongoId({ each: true })
  files: string[];
}
