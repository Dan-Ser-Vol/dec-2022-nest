import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserUpdateRequestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  username?: string;

  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;
}
