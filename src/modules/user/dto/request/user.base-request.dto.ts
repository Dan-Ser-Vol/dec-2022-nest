import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches } from "class-validator";
import { Transform } from 'class-transformer';
import { UserRolesEnum } from "../../enum/user-roles.enum";

export class UserBaseRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEnum(UserRolesEnum)
  role: UserRolesEnum;

  @Transform(({ value }) => value.trim().toLowerCase())
  @ApiProperty({ example: 'example@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'Пароль повинен містити принаймні одну цифру, одну маленьку та велику літеру, один спецсимвол і бути не менше 8 символів у довжину.',
  })
  password: string;
}
