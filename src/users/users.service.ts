import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return (new this.userModel(createUserDto)).save();
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string) {
    return await this.userModel.where('email', email).findOne().exec()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
