import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Username for authentication',
  })
  @IsString()
  @MinLength(3)
  username: string;

  @ApiProperty({
    example: '********',
    description: 'User password',
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password: string;
}
