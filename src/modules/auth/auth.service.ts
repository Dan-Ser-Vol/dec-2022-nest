import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { UserLoginDto } from './dto/request/user.login-request.dto';
import { IToken } from '../../common/interface/token.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRedisClient()
    private readonly redisClient: RedisClient,
    private readonly jwtService: JwtService,
  ) {}

  public async login(data: UserLoginDto): Promise<IToken> {
    try {
      const findUser = await this.userRepository.findOne({
        where: { email: data.email },
      });
      await this.comparePassword(data.password, findUser.password);
      const token = this.signIn({ id: findUser.id });
      await this.redisClient.setEx(token, 1000000, token);
      return { token };
    } catch (err) {
      throw new HttpException(
        'Email or password is wrong!',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  public async logout(): Promise<string> {
    return 'Exit';
  }

  public signIn(data: any): string {
    return this.jwtService.sign(data);
  }

  public async validateUser(data): Promise<UserEntity> {
    const findUser = await this.userRepository.findOneBy({ id: data.id });
    if (!findUser) {
      throw new UnprocessableEntityException('User entity not found');
    }
    return findUser;
  }

  public async decode(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (err) {
      Logger.error(err);
    }
  }
  public async comparePassword(
    newPassword: string,
    oldPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(newPassword, oldPassword);
  }
}
