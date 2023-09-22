import { ApiProperty } from '@nestjs/swagger';

export class CreateSeoDto {
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
    type: String,
    default: '',
  })
  description: string;

  product?: string;
  category?: string;
}
