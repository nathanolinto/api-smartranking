import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { populate } from '../common/typeorm/populate';
import { PlayersService } from '../players/players.service';
import { MongoRepository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './entities/match.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: MongoRepository<Match>,
    private readonly playersService: PlayersService,
  ) {}

  async createMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    if (!createMatchDto.players.includes(createMatchDto.winner)) {
      throw new BadRequestException(
        `winner ${createMatchDto.winner} not includes in players ${createMatchDto.players}`,
      );
    }
    const playerWinner = await this.playersService.getPlayerById(
      createMatchDto.winner,
    );
    for (const player of createMatchDto.players) {
      await this.playersService.getPlayerById(player);
    }
    const match = await this.matchRepository.save(createMatchDto);
    const players = await populate({
      ids: match.players,
      service: this.playersService,
      findById: 'getPlayerById',
    });
    return Object.assign(match, { players, winner: playerWinner });
  }

  async getAllMatches(): Promise<Match[]> {
    const matches = await this.matchRepository.findBy({});
    const matchesWithPlayers = [];
    for (const match of matches) {
      const players = await populate({
        ids: match.players,
        service: this.playersService,
        findById: 'getPlayerById',
      });
      const playerWinner = await this.playersService.getPlayerById(
        match.winner,
      );
      matchesWithPlayers.push(
        Object.assign(match, { players, winner: playerWinner }),
      );
    }
    return matchesWithPlayers;
  }

  async getMatchById(id: string): Promise<Match> {
    const match = await this.matchRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!match) {
      throw new NotFoundException(`Match ${id} not found`);
    }
    const players = await populate({
      ids: match.players,
      service: this.playersService,
      findById: 'getPlayerById',
    });
    const playerWinner = await this.playersService.getPlayerById(match.winner);

    return Object.assign(match, { players, winner: playerWinner });
  }
}
