import { Exclude } from 'class-transformer';
import { TodoEntity } from 'src/todo/entities/Todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => TodoEntity, (todos) => todos.user)
  todos: TodoEntity[];
}
