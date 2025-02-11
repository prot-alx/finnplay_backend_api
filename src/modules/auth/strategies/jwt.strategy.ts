import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserDto } from 'src/modules/users/dto/users.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request): string | null => {
          return (
            (request?.cookies as Record<string, string>)?.access_token ?? null
          );
        },
      ]),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('jwtSecret') ?? 'jwt_secret_key_reserve',
    });
  }

  async validate(payload: JwtPayload): Promise<Omit<UserDto, 'password'>> {
    return Promise.resolve({ id: payload.sub, username: payload.username });
  }
}
