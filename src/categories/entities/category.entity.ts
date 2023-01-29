import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from 'typeorm';
import { ICategory } from '../interfaces/category.interface';
import { Player } from '../../players/entity/player.entity';
import { EventType } from './event.type';

@Entity()
export class Category implements ICategory {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column({ unique: true })
  type: string;

  @Column()
  description: string;

  @Column(() => EventType)
  events: EventType[];

  @OneToMany(() => Player, (player) => player.category)
  players: Player[];
}
