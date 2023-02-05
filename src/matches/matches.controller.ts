import { Body, Controller, Post } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { Match } from './entities/match.entity';
import { MatchesService } from './matches.service';

@Controller({ path: 'matches', version: '1' })
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  async createCategory(@Body() createMatchDto: CreateMatchDto): Promise<Match> {
    return await this.matchesService.createMatch(createMatchDto);
  }
}
