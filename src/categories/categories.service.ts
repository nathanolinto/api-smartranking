import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { findPopulate } from '../common/typeorm/findAndPopulate';
import { MongoRepository } from 'typeorm';
import { AssignPlayerToCategoryDto } from './dto/assign-player-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Player } from '../players/entity/player.entity';
import { translate } from '../common/messages';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: MongoRepository<Category>,
    @InjectRepository(Player)
    private readonly playerRepository: MongoRepository<Player>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const foundCategory = await this.categoryRepository.findOneBy({ name });
    if (foundCategory) {
      throw new BadRequestException(
        translate('category.name.already.exists', name),
      );
    }
    return await this.categoryRepository.save(createCategoryDto);
  }

  async getAllCategories(): Promise<Category[]> {
    return await findPopulate({
      repository: this.categoryRepository,
      lookups: [{ from: 'player', localField: 'players' }],
    });
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await findPopulate({
      repository: this.categoryRepository,
      where: { _id: new ObjectId(id) },
      lookups: [{ from: 'player', localField: 'players' }],
    });
    if (category.length <= 0) {
      throw new NotFoundException(translate('category.id.not.found', id));
    }
    return category[0];
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!category) {
      throw new NotFoundException(translate('category.id.not.found', id));
    }
    return this.categoryRepository.save({
      ...category,
      ...updateCategoryDto,
    });
  }

  async assignPlayerToCategory(
    params: AssignPlayerToCategoryDto,
  ): Promise<Category> {
    const { categoryId, playerId } = params;

    const category = await this.categoryRepository.findOneBy({
      _id: new ObjectId(categoryId),
    });
    if (!category) {
      throw new BadRequestException(
        translate('category.id.not.found', categoryId),
      );
    }
    if (!category.players) {
      category.players = [];
    }

    const player = await this.playerRepository.findOneBy({
      _id: new ObjectId(playerId),
    });
    if (!player) {
      throw new BadRequestException(translate('player.id.not.found', playerId));
    }

    const playerAlreadyAssign = category.players.find(
      (playerInPlayers) => String(playerInPlayers) === playerId,
    );
    if (playerAlreadyAssign) {
      throw new BadRequestException(
        translate('player.id.already.assign', playerId),
      );
    }

    category.players.push(player._id);
    return await this.categoryRepository.save(category);
  }
}
