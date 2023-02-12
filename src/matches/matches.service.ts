import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './entities/match.entity';
import { ObjectId } from 'mongodb';
import { Player } from '../players/entity/player.entity';
import { findPopulate } from '../common/typeorm/findAndPopulate';
import { translate } from '../common/messages';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private readonly matchesRepository: MongoRepository<Match>,
    @InjectRepository(Player)
    private readonly playersRepository: MongoRepository<Player>,
  ) {}

  async createMatch(createMatchDto: CreateMatchDto): Promise<Match> {
    if (!createMatchDto.players.includes(createMatchDto.winner)) {
      throw new BadRequestException(
        translate('match.winner.id.not.includes.players', [
          createMatchDto.winner,
          String(createMatchDto.players),
        ]),
      );
    }
    const winnerObjectId = new ObjectId(createMatchDto.winner);
    const playerWinner = await this.playersRepository.findBy({
      _id: winnerObjectId,
    });
    if (!playerWinner) {
      throw new NotFoundException(
        translate('match.winner.id.not.found', createMatchDto.winner),
      );
    }

    const playersObjectId = createMatchDto.players.map(
      (id) => new ObjectId(id),
    );
    for (const [index, playerObjectId] of playersObjectId.entries()) {
      const player = await this.playersRepository.findOneBy({
        _id: playerObjectId,
      });
      if (!player) {
        throw new NotFoundException(
          translate('match.players.id.not.found', [
            String(index),
            String(playerObjectId),
          ]),
        );
      }
    }

    return await this.matchesRepository.save({
      ...createMatchDto,
      winner: winnerObjectId,
      players: playersObjectId,
    });
  }

  async getAllMatches(): Promise<Match[]> {
    return await findPopulate({
      repository: this.matchesRepository,
      lookups: [
        { from: 'player', localField: 'players' },
        { from: 'player', localField: 'winner', isSingle: true },
      ],
    });
  }

  async getMatchById(id: string): Promise<Match> {
    const match = await findPopulate({
      repository: this.matchesRepository,
      where: { _id: new ObjectId(id) },
      lookups: [
        { from: 'player', localField: 'players', as: 'players' },
        { from: 'player', localField: 'winner', as: 'winner', isSingle: true },
      ],
    });
    if (match.length <= 0) {
      throw new NotFoundException(translate('match.id.not.found', id));
    }
    return match[0];
  }
}
