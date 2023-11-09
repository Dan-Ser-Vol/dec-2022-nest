import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { UserEntity } from '../../database/entities/user.entity';
import { UserCreateRequestDto } from './dto/request/user.create-request.dto';
import { UserUpdateRequestDto } from './dto/request/user.update-request.dto';
import { UserListQueryRequestDto } from './dto/request/user-list-query.request.dto';
import { IList } from '../../common/interface/list.interface';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAll(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    return await this.userRepository.getAll(query);
  }

  public async getById(userId: string): Promise<UserEntity> {
    await this.findUserOrException(userId);
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: { cars: true },
    });
  }

  public async createUser(dto: UserCreateRequestDto): Promise<UserEntity> {
    const findUser = await this.userRepository.findOneBy({
      email: dto.email,
    });
    if (findUser) {
      throw new HttpException(
        'User already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = this.userRepository.create(dto);
    newUser.password = await bcrypt.hash(dto.password, 5);
    return await this.userRepository.save(newUser);
  }

  public async updateUser(
    userId: string,
    data: UserUpdateRequestDto,
  ): Promise<UserEntity> {
    const findUser = await this.findUserOrException(userId);
    await this.userRepository.merge(findUser, data);
    return this.userRepository.save(findUser);
  }

  public async deleteUser(userId: string): Promise<void> {
    const findUser = await this.findUserOrException(userId);
    await this.userRepository.remove(findUser);
  }

  public async findUserOrException(userId: string): Promise<UserEntity> {
    const findUser = await this.userRepository.findOneBy({ id: userId });
    if (!findUser) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return findUser;
  }
}
