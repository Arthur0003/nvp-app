import { Injectable } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { encodePassword } from '../utils/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await encodePassword(dto.password);

    const user = await this.userRepository.save({
      ...dto,
      password: hashedPassword,
    });

    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.find({ relations: ['todos'] });

      return users.map((user) => plainToClass(UserEntity, user));
    } catch (error) {
      console.log(error.message);
    }
  }

  async findById(id: number): Promise<UserEntity> {
    try {
      return this.userRepository.findOneBy({ id });
    } catch (error) {
      console.log(error.message);
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }

  async remove(id: number) {
    try {
      const deleted = await this.userRepository
        .createQueryBuilder('users')
        .delete()
        .from(UserEntity)
        .where('id = :id', { id })
        .execute();
      if (deleted) {
        return 'The element has been deleted';
      }
    } catch (error) {
      console.log(error);
    }
  }
}
