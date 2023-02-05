import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetByIdDto } from 'src/common/dto/getById.dto';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './entities/match.entity';
import { MatchesService } from './matches.service';

@Controller({ path: 'matches', version: '1' })
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  async createMatch(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
    return await this.matchesService.createMatch(createMatchDto);
  }

  @Get()
  async getAllMatches(): Promise<Match[]> {
    return await this.matchesService.getAllMatches();
  }

  @Get(':id')
  async getMatchById(@Param() params: GetByIdDto): Promise<Match> {
    return await this.matchesService.getMatchById(params.id);
  }
}
