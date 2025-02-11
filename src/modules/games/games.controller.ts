import { Controller, Get, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { GameData } from 'src/data/data.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllData(): GameData {
    return this.gamesService.getAllData();
  }
}
