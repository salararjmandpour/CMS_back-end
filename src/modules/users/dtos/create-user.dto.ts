import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

import { AddressDto } from './address.dto';
import { GenderEnum, NationalityEnum, RolesEnum } from '../schema/user.schema';

export class CreateUserDto {
  @ApiProperty({
    type: String,
    default: 'Alireza',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    default: 'Askarpour',
  })
  lastName: string;

  @ApiProperty({
    type: String,
    default: 'USER',
  })
  role: RolesEnum;

  @ApiProperty({
    type: String,
    default: 'alireza-askarpour',
  })
  username: string;

  @ApiProperty({
    type: String,
    default: 'askarpour@gmail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    default: 'male',
  })
  gender: GenderEnum;

  @ApiProperty({
    type: String,
    default: '1870872205',
  })
  nationalId: string;

  @ApiProperty({
    type: String,
    default: 'iranian',
  })
  nationality: NationalityEnum;

  @ApiProperty({
    type: String,
    default: '1383/02/26',
  })
  birthdate: string;

  @ApiProperty({
    type: [AddressDto],
    example: AddressDto,
  })
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  addresses: AddressDto[];
}
