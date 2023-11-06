import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarRepository } from './car.repository';
import { AuthModule } from '../auth/auth.module';
import { CarEntity } from '../../database/entities/car.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity]), AuthModule, UserModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
  exports: [CarService, CarRepository],
})
export class CarModule {}
