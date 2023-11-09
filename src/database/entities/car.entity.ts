import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUpdateModel } from './common/create.update.entity';
import { IsString } from 'class-validator';
import { ProducerEnum } from '../../modules/car/enum/producer.enum';
import { UserEntity } from './user.entity';

@Entity('car')
export class CarEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'varchar' })
  @IsString()
  model: string;

  @Column({ type: 'integer' })
  @IsString()
  year: number;

  @Column({ type: 'integer' })
  @IsString()
  price: number;

  @Column({ type: 'enum', enum: ProducerEnum })
  @IsString()
  producer: ProducerEnum;

  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  user: UserEntity;
}
