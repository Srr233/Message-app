import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MessageModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  text: string;
}
