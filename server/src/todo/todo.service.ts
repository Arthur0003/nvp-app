import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity } from './entities/Todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(dto: CreateTodoDto, userId: number): Promise<TodoEntity> {
    try {
      const todo = await this.todoRepository.save({
        ...dto,
        user: { id: userId },
      });

      return todo;
    } catch (error) {
      console.log(error);
    }
  }

  getAll(userId: number): Promise<TodoEntity[]> {
    const qb = this.todoRepository
      .createQueryBuilder('todo')
      .where('todo.userId = :userId', { userId });

    return qb.getMany();
  }

  getTodos() {
    const todos = this.todoRepository.find({ relations: ['user'] });
    return todos;
  }

  async remove(id: number) {
    try {
      const deleted = await this.todoRepository
        .createQueryBuilder('todos')
        .delete()
        .from(TodoEntity)
        .where('id = :id', { id: id })
        .execute();
      if (deleted) {
        return 'The element has been deleted';
      }
    } catch (error) {
      console.log(error);
    }
  }
}
