import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUpdateModel } from './common/create.update.entity';

@Entity()
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  username: string;

  @Column({ type: 'integer', nullable: true, default: 0 })
  age: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;
}
