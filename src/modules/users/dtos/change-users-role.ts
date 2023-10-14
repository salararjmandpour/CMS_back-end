import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from '../schema/user.schema';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangeUsersRole {
  @ApiProperty({
    type: String,
    default: RolesEnum.CUSTOMER,
  })
  @IsString()
  @IsNotEmpty()
  role: RolesEnum;

  @ApiProperty({
    type: Array<String>,
    default: ['64f6f9bd215ac8be4286eab4', '64f06cdf27d8e88ac1089a8f'],
  })
  usersIds: string[];
}
