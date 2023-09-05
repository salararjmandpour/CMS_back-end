import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddToGalleryDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: true,
  })
  file: any;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  alt: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  path: string;
  type: 'image' | 'video' | 'audio';
  filename: string;
  mimetype: string;
  size: number;
  dimensions: {
    width: number;
    height: number;
  };
  uploadedBy: string;
  uploadedIn: string;
}
