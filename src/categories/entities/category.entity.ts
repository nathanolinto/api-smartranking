import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICategory } from '../interfaces/category.interface';
import { EventType } from './event.type';

@Entity()
export class Category implements ICategory {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column(() => EventType)
  events: EventType[];

  @Column({ nullable: true, default: [] })
  players: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
