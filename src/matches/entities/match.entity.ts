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
  players: ObjectID[];

  @Column(() => ResultType)
  result: ResultType[];

  @Column(() => ObjectID)
  winner: ObjectID;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
