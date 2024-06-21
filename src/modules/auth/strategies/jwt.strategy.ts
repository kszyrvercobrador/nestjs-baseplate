import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { UsersService } from '@/modules/users/users.service';
import { User } from '@/schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.secret'),
    });
  }

  /**
   * Validates the JWT payload and returns the corresponding user.
   *
   * @param {JwtPayloadDto} payload - The JWT payload to validate.
   * @return {Promise<User>} The user corresponding to the JWT payload.
   */
  async validate(payload: JwtPayloadDto): Promise<User> {
    /**
     * TODO:
     * - validate jwt payload using JTI to prevent replay attacks
     * - Check if token has been revoked
     */
    return await this.userService.findOneOrFail(payload.sub);
  }
}
