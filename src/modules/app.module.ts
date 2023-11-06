import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfiguration } from '../config/database/type-orm-configuration';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    UserModule,
    CarModule,
    TypeOrmModule.forRootAsync(TypeOrmConfiguration.config),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
