import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Enter refreshToken for get new accessToken and refreshToken',
    type: String,
    required: true,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTA1NDUzODcyMCIsImlhdCI6MTY5MDI5MDc3OSwiZXhwIjoxNjkyODgyNzc5fQ.Hf7fUFbzwY3XGY_fx8SirUQM_Hav0Nsv_M1wG7QidN0',
  })
  refreshToken: string;
}
