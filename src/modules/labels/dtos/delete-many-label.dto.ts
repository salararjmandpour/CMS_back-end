import { ApiProperty } from '@nestjs/swagger';

export class LabelDeleteManyDto {
  @ApiProperty({
    type: Array<String>,
    default: ['64f6f9bd215ac8be4286eab4', '64f06cdf27d8e88ac1089a8f'],
  })
  categoriesIds: string[];
}
