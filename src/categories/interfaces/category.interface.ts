import { ObjectID } from 'typeorm';
import { IPlayer } from '../../players/interfaces/player.interface';
import { IEvent } from './event.interface';

export interface ICategory {
  _id: string | ObjectID;
  type: string;
  description: string;
  events: IEvent[];
  players: IPlayer[];
}