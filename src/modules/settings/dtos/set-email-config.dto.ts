import { ApiProperty } from '@nestjs/swagger';

export class SetEmailConfigDto {
  @ApiProperty({
    type: String,
    required: true,
    default: 'irweb.ir',
  })
  host: string;

  @ApiProperty({
    type: String,
    required: true,
    default: '354',
  })
  port: string;

  @ApiProperty({
    type: String,
    required: true,
    default: 'test@irweb.ir',
  })
  user: string;

  @ApiProperty({
    type: String,
    required: true,
    default: 'D9)F?d4%6Q&5',
  })
  pass: string;

  @ApiProperty({
    type: String,
    required: true,
    default: 'test@test.com',
  })
  senderEmail: string;
}
