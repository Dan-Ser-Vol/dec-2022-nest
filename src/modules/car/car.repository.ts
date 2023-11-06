import { Injectable } from '@nestjs/common';
import { CarEntity } from '../../database/entities/car.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }
}
