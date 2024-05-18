import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserModel {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column('date')
  createdAt: Date;

  @Column('date')
  updatedAt: Date;
}
