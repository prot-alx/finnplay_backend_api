import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Res,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

interface RequestWithCookies extends Request {
  cookies: {
    access_token?: string;
  };
}

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User authentication',
    description:
      'Authenticate user with username and password. Returns no content, sets JWT token in cookies.',
  })
  @ApiResponse({
    status: 200,
    description:
      'Successfully authenticated. JWT token is set in the "token" cookie.',
    headers: {
      'Set-Cookie': {
        description: 'token=<jwt_token>; Path=/; HttpOnly',
        schema: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    return this.authService.signIn(signInDto.username, signInDto.password, res);
  }

  @ApiOperation({
    summary: 'Check authentication status',
    description: 'Checks if the current JWT token is valid.',
  })
  @ApiResponse({ status: 200, description: 'Token is valid' })
  @ApiResponse({ status: 401, description: 'Token is invalid or expired' })
  @Get('check')
  check(@Req() req: RequestWithCookies): Promise<boolean> {
    const token = req.cookies.access_token;
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    return this.authService.check(token);
  }

  @ApiOperation({
    summary: 'User logout',
    description: 'Clears the authentication token cookie.',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response): Promise<void> {
    return this.authService.logout(res);
  }
}
