import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    default: 'Nest',
  })
  @IsString()
  title: string;

  @ApiProperty({
    default: false,
  })
  @IsBoolean()
  completed: boolean;
}
