import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserService) {}

  @Get()
  async getUsers() {
    return await this.userRepository.getUsers();
  }

  @Get(':userId')
  async getUserById(@Param('userId') userId: string) {
    return this.userRepository.getUserById(userId);
  }

  @Post()
  async createUser(@Body() userDto: UserCreateDto) {
    try {
      await this.userRepository.createUser(userDto);
      return 'User created';
    } catch (err) {
      console.log(err);
    }
  }
}
