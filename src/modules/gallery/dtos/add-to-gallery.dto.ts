import { ApiProperty } from '@nestjs/swagger';

export class AddToGalleryDto {
  @ApiProperty({
    type: String,
    required: true,
    default: 'مانيتور مخصوص بازی جی پلاس مدل GGM-L328QN سايز 32 اينچ',
  })
  alternativeText: string;

  @ApiProperty({
    type: String,
    required: true,
    default: 'مانيتور جی پلاس',
  })
  title: string;

  @ApiProperty({
    type: String,
    required: true,
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
