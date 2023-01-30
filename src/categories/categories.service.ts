import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { MongoRepository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: MongoRepository<Category>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name } = createCategoryDto;
    const foundPlayer = await this.categoryRepository.findOneBy({ name });
    if (foundPlayer) {
      throw new BadRequestException('Category with name already exists');
    }
    return await this.categoryRepository.save(createCategoryDto);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRepository.findOneBy({
      _id: new ObjectId(id),
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
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
    await this.categoryRepository.save(updatedCategory);
    return updatedCategory;
  }
}
