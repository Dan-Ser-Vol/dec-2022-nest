import { Injectable } from '@nestjs/common';
import { CarRepository } from './car.repository';
import { UserRepository } from '../user/user.repository';
import { CarCreateDto } from './dto/request/car-create.dto';
import { CarEntity } from '../../database/entities/car.entity';;

@Injectable()
export class CarService {
  constructor(
    private readonly carRepository: CarRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async createCar(dto: CarCreateDto): Promise<CarEntity> {
    const user = await this.userRepository.findOneBy({});
    const newCar = this.carRepository.create({ ...dto, user });
    return await this.carRepository.save(newCar);
  }
}
