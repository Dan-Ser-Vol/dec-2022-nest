import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserCreateRequestDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNumber()
  age: number;

  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
