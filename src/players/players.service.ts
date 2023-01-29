import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entity/player.entity';
import { MongoRepository } from 'typeorm';
import { IDelete } from './interfaces/delete.interface';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: MongoRepository<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<IPlayer> {
    const { email } = createPlayerDto;
    const foundPlayer = await this.playerRepository.findOne({
      where: { email },
    });
    if (foundPlayer) {
      throw new ConflictException('Player with e-mail already exists');
    }
    const player: IPlayer = {
      _id: uuidv4(),
      name: createPlayerDto.name,
      email,
      phone: createPlayerDto.phone,
      ranking: 'A',
      positionRanking: 1,
      urlPhoto: 'any_url',
    };
    return await this.playerRepository.save(player);
  }

  async updatePlayer(
    id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<IPlayer> {
    console.log(updatePlayerDto);
    const foundPlayer = await this.playerRepository.findOne({
      where: { _id: id },
    });

    if (!foundPlayer) {
      throw new NotFoundException('Player not found');
    }

    const { value: updatedPlayer } =
      await this.playerRepository.findOneAndUpdate(
        { _id: id },
        { $set: updatePlayerDto },
      );

    return updatedPlayer;
  }

  async getAllPlayers(): Promise<IPlayer[]> {
    return await this.playerRepository.find();
  }

  async getPlayerById(id: string): Promise<IPlayer> {
    const player = await this.playerRepository.findOne({
      where: { _id: id },
    });
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  async deletePlayerById(id: string): Promise<IDelete> {
    const { deletedCount: count } = await this.playerRepository.deleteOne({
      _id: id,
    });
    return { count };
  }

  async deleteAllPlayers(): Promise<IDelete> {
    const { deletedCount: count } = await this.playerRepository.deleteMany({});
    return { count };
  }
}
