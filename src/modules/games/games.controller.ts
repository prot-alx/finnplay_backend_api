import { Controller, Get } from '@nestjs/common';
import { GamesService } from './games.service';
import { GameData } from 'src/data/data.interface';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  getAllData(): GameData {
    return this.gamesService.getAllData();
  }
}
