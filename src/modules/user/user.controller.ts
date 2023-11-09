import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponseMapper } from './user.response.mapper';
import { UserCreateRequestDto } from './dto/request/user.create-request.dto';
import { UserCreateResponseDto } from './dto/response/user.create-response.dto';
import { UserUpdateRequestDto } from './dto/request/user.update-request.dto';
import { UserUpdateResponseDto } from './dto/response/user.update-response.dto';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { UserListResponseDto } from './dto/response/user.list-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesDecorator } from '../../common/decorators/role.decorator';
import { UserRolesEnum } from './enum/user-roles.enum';
import { RoleGuard } from '../../common/guards/role.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard(), RoleGuard)
  @RolesDecorator(UserRolesEnum.ADMIN)
  @Get()
  async getAllUsers(
    @Query() query: UserListQueryRequestDto,
  ): Promise<UserListResponseDto> {
    try {
      const result = await this.userService.getAll(query);
      return UserResponseMapper.toListDto(result, query);
    } catch (err) {
      throw new HttpException(err.massege, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiOperation({ summary: 'Get user by id' })
  @Get(':userId')
  async getById(
    @Param('userId') userId: string,
  ): Promise<UserCreateResponseDto> {
    try {
      const result = await this.userService.getById(userId);
      return UserResponseMapper.toDetailsDto(result);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
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
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @ApiOperation({ summary: 'update user by id' })
  @Put('update/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() data: UserUpdateRequestDto,
  ): Promise<UserUpdateResponseDto> {
    try {
      const result = await this.userService.updateUser(userId, data);
      return UserResponseMapper.toDetailsDto(result);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @ApiOperation({ summary: 'Delete user by id' })
  @Delete('delete/:userId')
  async deleteUser(@Param('userId') userId: string): Promise<void> {
    try {
      await this.userService.deleteUser(userId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }
}
