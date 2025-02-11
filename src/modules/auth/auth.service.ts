import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

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

  async check(token: string): Promise<boolean> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      const user = await this.usersService.findOne(payload.username);
      if (!user) {
        throw new UnauthorizedException();
      }
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  async logout(res: Response): Promise<void> {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return Promise.resolve();
  }
}
