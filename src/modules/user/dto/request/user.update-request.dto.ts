import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserUpdateRequestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  age?: number;

  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}
