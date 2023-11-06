import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserUpdateResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'example@gmail.com' })
  @IsString()
  @IsEmail()
  email: string;
}
