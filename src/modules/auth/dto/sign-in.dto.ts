import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'john_doe',
    description: 'Username for authentication',
    minLength: 3,
    maxLength: 20,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    example: '********',
    description: 'User password',
    minLength: 6,
    maxLength: 32,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}
