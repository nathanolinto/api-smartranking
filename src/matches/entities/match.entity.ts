import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IMatch } from '../interfaces/match.interface';
import { ResultType } from './result.type';

@Entity()
export class Match implements IMatch {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ nullable: true, default: [] })
  players: string[];

  @Column(() => ResultType)
  result: ResultType[];

  @Column()
  winner: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
