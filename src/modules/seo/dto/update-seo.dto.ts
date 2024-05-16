import { ApiProperty } from '@nestjs/swagger';

export class UpdateSeoDto {
  @ApiProperty({
    type: Array<String>,
    default: [],
  })
  title: string[];

  @ApiProperty({
    type: String,
    default: '',
  })
  slug: string;

  @ApiProperty({
    type: Object,
    default: {},
  })
  description: object;
}
