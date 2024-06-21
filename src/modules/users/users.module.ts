import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel } from 'src/schemas/user.schema';

@Module({
  imports: [MongooseModule.forFeature([UserModel])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
