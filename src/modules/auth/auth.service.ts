import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string, res: Response): Promise<void> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync({
      sub: user.id,
      username: user.username,
    });

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: true, // для HTTPS
      sameSite: 'strict',
      maxAge: 3600000, // 1 час
    });
  }
}
