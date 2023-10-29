import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserCreateProfileDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
