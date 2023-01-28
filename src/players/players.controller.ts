import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { IPlayer } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playersService: PlayersService) {}

  @Get('/all')
  async getAllPlayers(): Promise<IPlayer[]> {
    return await this.playersService.getAllPlayers();
  }

  @Get(':id')
  async getPlayerById(@Param('id') id: string): Promise<IPlayer> {
    const player = await this.playersService.getPlayerById(id);
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  @Post()
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<IPlayer> {
    return await this.playersService.createPlayer(createPlayerDto);
  }
}
