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
import { IDelete } from './interfaces/delete.interface';
import { Player } from './entity/player.entity';
import { PlayersService } from './players.service';

@Controller('players')
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
  async getPlayerById(@Param('id') id: string): Promise<Player> {
    return await this.playersService.getPlayerById(id);
  }

  @Put(':id')
  async updatePlayer(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return await this.playersService.updatePlayer(id, updatePlayerDto);
  }

  @Delete('/all')
  async deleteAllPlayers(): Promise<IDelete> {
    return await this.playersService.deleteAllPlayers();
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: string): Promise<IDelete> {
    return await this.playersService.deletePlayerById(id);
  }
}
