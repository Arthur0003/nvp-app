import { Controller, Get, UseGuards } from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { userID } from 'src/decorators/user-Id.decorator';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/check')
  @UseGuards(JwtAuthGuard)
  getMe(@userID() id: number) {
    return this.usersService.findById(id);
  }

  @Get('/all')
  getAll() {
    return this.usersService.getAllUsers();
  }
}
