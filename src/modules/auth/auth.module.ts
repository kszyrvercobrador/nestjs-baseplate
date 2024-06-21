import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (cs: ConfigService) => ({
        global: true,
        secret: cs.get('auth.secret'),
        signOptions: { expiresIn: cs.get('auth.expiration') },
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule {}