import {
  Column,
  Entity,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
} from 'typeorm';
import { IPlayer } from '../interfaces/player.interface';

@Entity()
export class Player implements IPlayer {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  ranking: string;

  @Column()
  positionRanking: number;

  @Column()
  urlPhoto: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
