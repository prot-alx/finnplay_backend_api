import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/modules/users/dto/users.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        configService.get<string>('jwtSecret') ?? 'jwt_secret_key_reserve',
    });
  }

  async validate(payload: JwtPayload): Promise<Omit<UserDto, 'password'>> {
    return Promise.resolve({ id: payload.sub, username: payload.username });
  }
}
