import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GetByIdDto } from 'src/common/dto/getById.dto';
import { CategoriesService } from './categories.service';
import { AssignPlayerToCategoryDto } from './dto/assign-player-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller({
  path: 'categories',
  version: '1',
})
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async getAllCategories(): Promise<Category[]> {
    return await this.categoriesService.getAllCategories();
  }

  @Get(':id')
  async getPlayerById(@Param() params: GetByIdDto): Promise<Category> {
    return await this.categoriesService.getCategoryById(params.id);
  }

  @Put(':id')
  async updatePlayer(
    @Param() params: GetByIdDto,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.updateCategory(
      params.id,
      updateCategoryDto,
    );
  }

  @Post(':categoryId/player/:playerId')
  async assignPlayerToCategory(
    @Param() params: AssignPlayerToCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.assignPlayerToCategory(params);
  }
}
