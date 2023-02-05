import { Injectable, NotFoundException } from '@nestjs/common';
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
    const playerDef = await this.playersService.getPlayerById(
      createMatchDto.def,
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
    return Object.assign(match, { players, def: playerDef });
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
      const playerDef = await this.playersService.getPlayerById(match.def);
      matchesWithPlayers.push(
        Object.assign(match, { players, def: playerDef }),
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

    const test = await this.matchRepository.findBy({
      _id: {
        $in: [
          new ObjectId('63e02654803dbc6d71d83fd3'),
          new ObjectId('63e0280615afcf9cab5e5cc8'),
        ],
      },
    });
    console.log('---Teste', test);

    const players = await populate({
      ids: match.players,
      service: this.playersService,
      findById: 'getPlayerById',
    });
    const playerDef = await this.playersService.getPlayerById(match.def);

    return Object.assign(match, { players, def: playerDef });
  }
}
