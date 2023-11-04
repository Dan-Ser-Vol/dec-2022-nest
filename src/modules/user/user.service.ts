import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserEntity } from '../../database/entities/user.entity';
import { UserCreateRequestDto } from './dto/request/user.create-request.dto';
import { UserUpdateRequestDto } from './dto/request/user.update-request.dto';
import { UserListQueryRequestDto } from './dto/request/user.-list-query.request.dto';
import { IList } from '../../common/interface/list.interface';

@Injectable()
export class UserService {
  constructor(private readonly usersRepository: UserRepository) {}

  public async getAll(
    query: UserListQueryRequestDto,
  ): Promise<IList<UserEntity>> {
    return await this.usersRepository.getAll(query);
  }

  public async getById(userId: number): Promise<UserEntity> {
    return await this.findUserOrException(userId);
  }

  public async createUser(dto: UserCreateRequestDto): Promise<UserEntity> {
    const findUser = await this.usersRepository.findOneBy({
      email: dto.email,
    });
    if (findUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.usersRepository.create(dto);
    return await this.usersRepository.save(newUser);
  }

  public async updateUser(
    userId: number,
    data: UserUpdateRequestDto,
  ): Promise<UserEntity> {
    const findUser = await this.findUserOrException(userId);
    await this.usersRepository.merge(findUser, data);
    return this.usersRepository.save(findUser);
  }

  public async deleteUser(userId: number): Promise<void> {
    const findUser = await this.findUserOrException(userId);
    await this.usersRepository.remove(findUser);
  }

  private async findUserOrException(userId: number): Promise<UserEntity> {
    const findUser = await this.usersRepository.findOneBy({ id: userId });
    if (!findUser) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return findUser;
  }
}
