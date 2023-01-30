import { Module } from '@nestjs/common';
import { PlayerController } from './players.controller';
import { PlayersService } from './players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entity/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayersService],
  exports: [PlayersService],
})
export class PlayersModule {}
