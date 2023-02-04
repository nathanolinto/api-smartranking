import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from 'src/players/players.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), PlayersModule],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
