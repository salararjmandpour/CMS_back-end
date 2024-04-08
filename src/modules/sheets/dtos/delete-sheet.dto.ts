import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class DeleteSheetDto {
  @ApiProperty()
  @IsMongoId({ each: true })
  sheetIDs: string[];
}
