import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG_KEY } from 'src/common/types/config.types';
import { JwtPayload } from '../types/jwtpayload.type';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get(CONFIG_KEY.ACCESS_TOKEN_SECRET),
    });
  }

  async validate(payload: JwtPayload) {
    return payload;
  }
}
