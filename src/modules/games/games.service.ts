import { Injectable } from '@nestjs/common';
import { gameData } from 'src/data/data';
import { GameData } from 'src/data/data.interface';

@Injectable()
export class GamesService {
  private readonly gameData: GameData = gameData;

  getAllData(): GameData {
    return this.gameData;
  }
}
