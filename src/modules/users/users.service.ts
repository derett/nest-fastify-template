import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private model: typeof User) {}

  async getByEmail(email: string): Promise<User> {
    return this.model.findOne({ where: { email } });
  }

  async create(userData: CreateUserDto) {
    return await this.model.create(userData);
  }
}
