import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUpdateModel } from './common/create.update.entity';
import { IsString } from 'class-validator';
import { CarEntity } from './car.entity';
import { UserRolesEnum } from '../../modules/user/enum/user-roles.enum';

@Entity('user')
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  username: string;

  @Column({ type: 'enum', enum: UserRolesEnum, default: UserRolesEnum.BUYER })
  @IsString()
  role: UserRolesEnum;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsString()
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  password: string;

  @OneToMany(() => CarEntity, (entity) => entity.user)
  cars: CarEntity[];
}
