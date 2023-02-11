import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Player } from '../players/entity/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match, Player])],
  providers: [MatchesService],
  controllers: [MatchesController],
})
export class MatchesModule {}
