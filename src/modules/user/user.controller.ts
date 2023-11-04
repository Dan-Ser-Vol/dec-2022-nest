import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponseMapper } from './user.response.mapper';
import { UserCreateRequestDto } from './dto/request/user.create-request.dto';
import { UserCreateResponseDto } from './dto/response/user.create-response.dto';
import { UserUpdateRequestDto } from './dto/request/user.update-request.dto';
import { UserUpdateResponseDto } from './dto/response/user.update-response.dto';
import { UserListQueryRequestDto } from './dto/request/user.-list-query.request.dto';
import { UserListResponseDto } from './dto/response/user.list-response.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @Get()
  async getAllUsers(
    @Query() query: UserListQueryRequestDto,
  ): Promise<UserListResponseDto> {
    const result = await this.userService.getAll(query);
    return UserResponseMapper.toListDto(result, query);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':userId')
  async getById(
    @Param('userId') userId: number,
  ): Promise<UserCreateResponseDto> {
    const result = await this.userService.getById(userId);
    return UserResponseMapper.toDetailsDto(result);
  }

  @ApiOperation({ summary: 'Create new user' })
  @Post('create')
  async createUser(
    @Body() dto: UserCreateRequestDto,
  ): Promise<UserCreateResponseDto> {
    try {
      const result = await this.userService.createUser(dto);
      return UserResponseMapper.toDetailsDto(result);
    } catch (err) {
      console.log(err);
    }
  }

  @ApiOperation({ summary: 'update user by id' })
  @Put('update/:userId')
  async updateUser(
    @Param('userId') userId: number,
    @Body() data: UserUpdateRequestDto,
  ): Promise<UserUpdateResponseDto> {
    const result = await this.userService.updateUser(userId, data);
    return UserResponseMapper.toDetailsDto(result);
  }
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user by id' })
  @Delete('delete/:userId')
  async deleteUser(@Param('userId') userId: number): Promise<void> {
    try {
      await this.userService.deleteUser(userId);
    } catch (err) {
      console.log(err);
    }
  }
}
