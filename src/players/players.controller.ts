import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { IDelete } from '../common/interfaces/delete.interface';
import { Player } from './entity/player.entity';
import { PlayersService } from './players.service';
import { GetByIdDto } from 'src/common/dto/getById.dto';

@Controller({
  path: 'players',
  version: '1',
})
export class PlayerController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<Player> {
    return await this.playersService.createPlayer(createPlayerDto);
  }

  @Get()
  async getAllPlayers(): Promise<Player[]> {
    return await this.playersService.getAllPlayers();
  }

  @Get(':id')
  async getPlayerById(@Param() params: GetByIdDto): Promise<Player> {
    return await this.playersService.getPlayerById(params.id);
  }

  @Put(':id')
  async updatePlayer(
    @Param() params: GetByIdDto,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return await this.playersService.updatePlayer(params.id, updatePlayerDto);
  }

  @Delete('/all')
  async deleteAllPlayers(): Promise<IDelete> {
    return await this.playersService.deleteAllPlayers();
  }

  @Delete(':id')
  async deletePlayer(@Param() params: GetByIdDto): Promise<IDelete> {
    return await this.playersService.deletePlayerById(params.id);
  }
}
