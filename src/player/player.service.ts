import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayerService {
  private players: IPlayer[] = [];

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<IPlayer> {
    const player: IPlayer = {
      id: uuidv4(),
      name: createPlayerDto.name,
      email: createPlayerDto.email,
      phone: createPlayerDto.phone,
      ranking: 'A',
      positionRanking: 1,
      urlPhoto: 'any_url',
    };
    this.players.push(player);
    return player;
  }

  async getAllPlayers(): Promise<IPlayer[]> {
    return this.players;
  }

  async getPlayerById(id: string): Promise<IPlayer> {
    return this.players.find((player) => player.id === id);
  }
}
