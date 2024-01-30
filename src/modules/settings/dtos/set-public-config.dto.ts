import { ApiProperty } from '@nestjs/swagger';

export class SetPublicConfigDto {
  @ApiProperty()
  siteTitle?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  siteAddress: string;

  @ApiProperty()
  routeAddress: string;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  timezone?: string;
}
