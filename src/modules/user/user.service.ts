import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UserRepository,
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async createUser(dto): Promise<User[]> {
    const findUser = await this.usersRepository.findOne({
      where: { email: dto.email },
    });
    if (findUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.usersRepository.create(dto);
    return this.usersRepository.save(newUser);
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: Number(userId) },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
