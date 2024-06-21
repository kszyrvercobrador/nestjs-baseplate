import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    UsersModule,
    AuthModule,
  ]
})
export class AppModule {}
