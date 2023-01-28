import { Module } from '@nestjs/common';
import { PlayerController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  controllers: [PlayerController],
  providers: [PlayersService],
})
export class PlayersModule {}
