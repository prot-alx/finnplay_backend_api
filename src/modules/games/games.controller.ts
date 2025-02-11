import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GameDataDto } from './dto/game-data.dto';

@ApiTags('Games')
@ApiBearerAuth()
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({
    summary: 'Get all games data',
    description: 'Retrieve complete list of games, providers and groups',
  })
  @ApiResponse({
    status: 200,
    description: 'List of games data',
    type: GameDataDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get()
  @UseGuards(JwtAuthGuard)
  getAllData(): GameDataDto {
    return this.gamesService.getAllData();
  }
}
