import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'joe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    default: 'doe',
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    default: 'joe@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    default: 'joe',
  })
  @IsString()
  password: string;
}
