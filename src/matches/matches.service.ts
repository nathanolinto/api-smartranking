import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { populate } from '../common/typeorm/populate';
import { PlayersService } from '../players/players.service';
import { MongoRepository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './entities/match.entity';

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
}
