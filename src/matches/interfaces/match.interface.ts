import { IPlayer } from 'src/players/interfaces/player.interface';
import { ObjectID } from 'typeorm';
import { IResult } from './result.interface';

export interface IMatch {
  _id: string | ObjectID;
  players: string[] | ObjectID[] | IPlayer[];
  result: IResult[];
  winner: string | ObjectID | IPlayer;
}
