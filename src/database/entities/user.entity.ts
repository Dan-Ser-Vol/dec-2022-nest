import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUpdateModel } from './common/create.update.entity';
import { IsString, Matches } from 'class-validator';

@Entity()
export class UserEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  username: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  @IsString()
  email: string;

  @Column({ type: 'varchar', nullable: false })
  @IsString()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/, {
    message:
      'Пароль повинен містити принаймні одну цифру, одну маленьку та велику літеру, один спецсимвол і бути не менше 8 символів у довжину.',
  })
  password: string;
}
