import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DeletePostDto {
  @ApiProperty()
  @IsMongoId({ each: true })
  postIDs: string[];
}
