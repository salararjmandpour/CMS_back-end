import { ApiProperty } from '@nestjs/swagger';

export class CreateSeoDto {
  @ApiProperty({
    type: Array<String>,
    default: [],
    example:['string']
  })
  title: string[];

  @ApiProperty({
    type: String,
    default: '',
    example:'string'
  })
  slug: string;

  @ApiProperty({
    type: String,
    default: '',
    example:'string'
  })
  description: string;

  product?: string;
  category?: string;
  sheet?: string;
  post?: string;
}
