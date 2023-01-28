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
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('/all')
  async getAllPlayers(): Promise<IPlayer[]> {
    return await this.playerService.getAllPlayers();
  }

  @Get(':id')
  async getPlayerById(@Param('id') id: string): Promise<IPlayer> {
    const player = await this.playerService.getPlayerById(id);
    if (!player) {
      throw new NotFoundException('Player not found');
    }
    return player;
  }

  @Post()
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<IPlayer> {
    return await this.playerService.createPlayer(createPlayerDto);
  }
}
