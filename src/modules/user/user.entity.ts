import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'Unique ID of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'John', description: 'Name of the user' })
  @Column({ type: 'varchar', nullable: false })
  username: string;

  @ApiProperty({
    example: '23',
    description: 'Age of the user',
  })
  @Column({ type: 'integer', nullable: true, default: 0 })
  age: number;

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the user',
  })
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @ApiProperty({ example: 'MyP@ssw0rd!', description: 'Password of the user' })
  @Column({ type: 'varchar', nullable: false })
  password: string;
}
