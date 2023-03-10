import { IPlayer } from 'src/players/interfaces/player.interface';
import { ObjectID } from 'typeorm';
import { IEvent } from './event.interface';

export interface ICategory {
  _id: string | ObjectID;
  name: string;
  description: string;
  events: IEvent[];
  players: string[] | ObjectID[] | IPlayer[];
}
