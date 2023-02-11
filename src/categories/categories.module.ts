import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from '../players/entity/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Player])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
