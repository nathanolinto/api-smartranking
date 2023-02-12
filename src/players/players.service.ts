import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entity/player.entity';
import { MongoRepository } from 'typeorm';
import { IDelete } from '../common/interfaces/delete.interface';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ObjectId } from 'mongodb';
import { translate } from 'src/common/messages';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: MongoRepository<Player>,
  ) {}

  async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;
    const player = await this.playerRepository.findOneBy({ email });
    if (player) {
      throw new BadRequestException(
        translate('player.email.already.exists', email),
      );
    }
    return await this.playerRepository.save(createPlayerDto);
  }

  async updatePlayer(
    id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    const player = await this.playerRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!player) {
      throw new NotFoundException(translate('player.id.not.found', id));
    }
    const updatedPlayer = Object.assign(player, updatePlayerDto);
    await this.playerRepository.save(updatedPlayer);
    return updatedPlayer;
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async getPlayerById(id: string) {
    const player = await this.playerRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!player) {
      throw new NotFoundException(translate('player.id.not.found', id));
    }
    return player;
  }

  async deletePlayerById(id: string): Promise<IDelete> {
    const { deletedCount: count } = await this.playerRepository.deleteOne({
      _id: new ObjectId(id),
    });
    return { count };
  }

  async deleteAllPlayers(): Promise<IDelete> {
    const { deletedCount: count } = await this.playerRepository.deleteMany({});
    return { count };
  }
}
