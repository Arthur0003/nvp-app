import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { comparePassword } from 'src/utils/bcrypt';
import { UserEntity } from 'src/users/entities/user.entity';

type Result = Omit<UserEntity, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<Result> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await comparePassword(pass, user?.password))) {
      throw new UnauthorizedException('Unauthorized User');
    }

    const { password, ...result } = user;

    return result;
  }

  async login(user: UserEntity): Promise<{ token: string }> {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }

  async register(dto: CreateUserDto): Promise<{ token: string }> {
    try {
      const userData = await this.usersService.create(dto);

      return {
        token: this.jwtService.sign({
          id: userData.id,
        }),
      };
    } catch (error) {
      throw new ConflictException('The user with this email is already exists');
    }
  }
}
