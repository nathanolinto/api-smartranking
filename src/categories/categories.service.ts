import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { populate } from 'src/common/typeorm/populate';
import { PlayersService } from 'src/players/players.service';
import { MongoRepository } from 'typeorm';
import { AssignPlayerToCategoryDto } from './dto/assign-player-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: MongoRepository<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const foundCategory = await this.categoryRepository.findOneBy({ name });
    if (foundCategory) {
      throw new BadRequestException('Category with name already exists');
    }
    return await this.categoryRepository.save(createCategoryDto);
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.findBy({});
    const categoriesWithPlayers = [];
    for (const category of categories) {
      const players = await populate({
        ids: category.players,
        service: this.playersService,
        findById: 'getPlayerById',
      });
      categoriesWithPlayers.push(Object.assign(category, { players }));
    }
    return categoriesWithPlayers;
  }

  async getCategoryById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const players = await populate({
      ids: category.players,
      service: this.playersService,
      findById: 'getPlayerById',
    });

    return Object.assign(category, { players });
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const idObjectId = new ObjectId(id);
    const foundCategory = await this.categoryRepository.findOneBy({
      _id: idObjectId,
    });
    if (!foundCategory) {
      throw new NotFoundException('Player not found');
    }
    const updatedCategory = Object.assign(foundCategory, updateCategoryDto);
    return this.categoryRepository.save(updatedCategory);
  }

  async assignPlayerToCategory(
    params: AssignPlayerToCategoryDto,
  ): Promise<Category> {
    const { categoryId, playerId } = params;

    const categoryFound = await this.categoryRepository.findOneBy({
      _id: new ObjectId(categoryId),
    });
    if (!categoryFound) {
      throw new BadRequestException('Category not found');
    }
    if (!categoryFound.players) {
      categoryFound.players = [];
    }

    await this.playersService.getPlayerById(playerId);

    const playerAlreadyAssign = categoryFound.players.find((player) => {
      return player === playerId;
    });
    if (playerAlreadyAssign) {
      throw new BadRequestException('Player already assign');
    }

    categoryFound.players.push(playerId);
    return await this.categoryRepository.save(categoryFound);
  }
}
