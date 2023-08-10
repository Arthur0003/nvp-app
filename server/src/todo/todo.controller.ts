import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { userID } from 'src/decorators/user-Id.decorator';

@Controller('todo')
@ApiTags('Todos')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@userID() userId: number) {
    return this.todoService.getAll(userId);
  }

  @Get('/all')
  getAllTodos() {
    return this.todoService.getTodos();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }

  @Post()
  create(@Body() todoDto: CreateTodoDto, @userID() userID: number) {
    return this.todoService.create(todoDto, userID);
  }
}
