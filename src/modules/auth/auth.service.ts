import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Registers a new user with the provided information.
   *
   * @param {RegisterDto} registerDto - The data for registering a new user.
   * @return {Promise<User>} The newly created user.
   */
  async register(registerDto: RegisterDto): Promise<User> {
    return await this.userService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: await User.hashPassword(registerDto.password),
    });
  }

  /**
   * Logs in a user and generates a JWT token.
   *
   * @param {User} user - The user object.
   * @return {Promise<{ accessToken: string, user: User }>} The JWT token and the user object.
   */
  async login(user: User) {
    return {
      accessToken: await this.generateJwtToken(user),
      user,
    };
  }

  /**
   * Finds a user by ID.
   *
   * @param {string} id - The ID of the user to find
   * @return {Promise<User>} The user found or throws an error
   */
  async user(id: string): Promise<User> {
    return await this.userService.findOneOrFail(id);
  }

  /**
   * Validate credentials for a user.
   *
   * @param {string} email - The email of the user
   * @param {string} password - The password of the user
   * @return {User | null} The user object if credentials are valid, otherwise null
   */
  async validateCredentials(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  /**
   * Generates a JWT token for the user.
   *
   * @param {User} user - The user object to generate the token for
   * @return {Promise<string>} The JWT token generated
   */
  private async generateJwtToken(user: User): Promise<string> {
    const payload = {
      sub: user.id,
      jti: uuidv4(),
      email: user.email,
      name: user.name,
    } as JwtPayloadDto;
    return await this.jwtService.signAsync(payload);
  }
}
