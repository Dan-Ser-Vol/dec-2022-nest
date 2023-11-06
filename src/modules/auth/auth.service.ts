import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { InjectRedisClient, RedisClient } from '@webeleon/nestjs-redis';
import { UserLoginDto } from './dto/request/user.login-request.dto';
import { IToken } from '../../common/interface/token.interface';

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
    const findUser = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!findUser) {
      throw new HttpException(
        'Email or password is wrong!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.signIn({ id: findUser.id });
    await this.redisClient.setEx(token, 1000000, token);
    return { token };
  }

  public signIn(data: any): string {
    return this.jwtService.sign(data);
  }

  public async validateUser(data: any): Promise<UserEntity> {
    return await this.userRepository.findOneBy(data.id);
  }

  public async decode(token: string): Promise<any> {
    try {
      return this.jwtService.decode(token);
    } catch (err) {
      Logger.error(err);
    }
  }
}
