import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
