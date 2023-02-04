import { ObjectID } from 'typeorm';

export interface IPlayer {
  _id: string | ObjectID;
  name: string;
  email: string;
  phone: string;
  ranking: string;
  positionRanking: number;
  urlPhoto: string;
}
