import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { UpdateSeoDto } from 'src/modules/seo/dto/update-seo.dto';

export class UpdateLabelDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'تجهیرات پزشکی',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'medical-equipment',
  })
  slug: string;

  @ApiProperty({
    type: String,
    default: '',
  })
  description: string;

  @ApiProperty()
  image: string;

}

export class UpdateLabelWithDto {
  @ApiProperty({
    type: UpdateLabelDto,
    default: UpdateLabelDto,
  })
  @ValidateNested()
  @Type(() => UpdateLabelDto)
  label: UpdateLabelDto;

  @ApiProperty({
    type: UpdateSeoDto,
    default: UpdateSeoDto,
  })
  @ValidateNested()
  @Type(() => UpdateSeoDto)
  seo: UpdateSeoDto;
}
