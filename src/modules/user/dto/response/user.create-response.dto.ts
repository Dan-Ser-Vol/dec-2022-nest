import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';

export class UserCreateResponseDto {
  @ApiProperty()
  @IsNumber()
  id: string;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsDate()
  createdAt: Date;
}
