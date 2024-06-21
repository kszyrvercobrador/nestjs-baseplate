import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@/schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  /**
   * Validates the provided username and password against the authentication service.
   *
   * @param {string} email - The username to validate.
   * @param {string} password - The password to validate.
   * @return {Promise<User>} A promise that resolves to the validated user object if the credentials are valid, or rejects with an UnauthorizedException if the credentials are invalid.
   */
  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateCredentials(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
