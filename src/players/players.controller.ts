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
import { IPlayer } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playersService: PlayersService) {}

  @Get()
  async getAllPlayers(): Promise<IPlayer[]> {
    return await this.playersService.getAllPlayers();
  }

  @Get(':id')
  async getPlayerById(@Param('id') id: string): Promise<IPlayer> {
    return await this.playersService.getPlayerById(id);
  }

  @Post()
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<IPlayer> {
    return await this.playersService.createPlayer(createPlayerDto);
  }

  @Put(':id')
  async updatePlayer(
    @Param('id') id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<IPlayer> {
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
