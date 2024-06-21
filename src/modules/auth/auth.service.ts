import { Injectable, UnauthorizedException } from '@nestjs/common';
import {  LoginDto } from './dto/login.dto';
import { UsersService } from '@/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/schemas/user.schema';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {

  constructor (
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    return await this.userService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: await User.hashPassword(registerDto.password)
    })
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email)

    if (!user) throw new UnauthorizedException('These credentials do not match our records.');

    const isMatch = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatch) throw new UnauthorizedException('The provided password is incorrect.');

    const accessToken = await this.generateJwtToken(user);

    return { accessToken, user }
  }

  logout() {
    // Auth Logout
  }

  private async generateJwtToken(user: User): Promise<string> {
    const payload = {sub: user.id, email: user.email, name: user.name};
    return await this.jwtService.signAsync(payload);
  }


}
