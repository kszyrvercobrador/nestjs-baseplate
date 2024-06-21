import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global:true,
      secret: 'jdfguidsfhijghjsdfghsdhgjhjsfdg',
      signOptions: { expiresIn: '120s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
