import { ApiProperty } from '@nestjs/swagger';

export class UpdateFromGalleryDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: any;

  @ApiProperty({
    type: String,
    default: 'مانيتور مخصوص بازی جی پلاس مدل GGM-L328QN سايز 32 اينچ',
  })
  alt: string;

  @ApiProperty({
    type: String,
    default: 'مانيتور جی پلاس',
  })
  title: string;

  @ApiProperty({
    type: String,
    default: 'مانيتور مخصوص بازی جی پلاس مدل GGM-L328QN سايز 32 اينچ',
  })
  description: string;

  path: string;
  type: 'image' | 'video' | 'audio';
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
}
