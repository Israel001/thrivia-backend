import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtAuthConfiguration } from 'src/config/configuration';
import { IAuthContext } from 'src/types';

@Injectable()
export class ExpiredJwtStrategy extends PassportStrategy(
  Strategy,
  'expired-jwt',
) {
  constructor(
    @Inject(JwtAuthConfiguration.KEY)
    protected readonly jwtAuthConfig: ConfigType<typeof JwtAuthConfiguration>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtAuthConfig.secretKey,
    });
  }

  async validate(payload: any): Promise<IAuthContext> {
    return {
      uuid: payload.uuid,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phoneNumber: payload.phoneNumber,
      bankAccounts: payload.bankAccounts,
    };
  }
}
