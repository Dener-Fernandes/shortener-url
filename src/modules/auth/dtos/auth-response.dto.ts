import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({
    type: 'string',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Mjc3NjM3YS00MmUzLTQyNGQtYmYzZS0xYTg5Njk4MGM3MDMiLCJpYXQiOjE3NDMyNzgyMDMsImV4cCI6MTc0MzI4MTgwM30.n6H5kSmGJmAxUxeySuhkjdfeWIpjXBgFZ-BFgEWvTuc',
  })
  readonly accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}
