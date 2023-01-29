import { Module } from '@nestjs/common';
import { PlayerController } from './players.controller';
import { PlayersService } from './players.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entity/player.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayerController],
  providers: [PlayersService],
})
export class PlayersModule {}
