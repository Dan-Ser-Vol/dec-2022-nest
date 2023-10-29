import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateProfileDto } from './dto/user.dto';
import { User } from './user.entity';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Post('create')
  async createUser(@Body() dto: UserCreateProfileDto): Promise<User[]> {
    try {
      return this.userService.createUser(dto);
    } catch (err) {
      console.log(err);
    }
  }

  @Delete('delete/:userId')
  async deleteUser(@Param() userId: string): Promise<string> {
    try {
      await this.userService.deleteUser(userId);
      return `User id ${userId} was deleted`;
    } catch (err) {
      console.log(err);
    }
  }
}
