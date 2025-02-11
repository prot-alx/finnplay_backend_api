import { ApiProperty } from '@nestjs/swagger';

export class GameDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the game',
  })
  id: number;

  @ApiProperty({
    example: 'Poker Stars',
    description: 'Name of the game',
  })
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Provider identifier',
  })
  provider: number;

  @ApiProperty({
    example: 'https://example.com/cover.jpg',
    description: 'URL to game cover image',
  })
  cover: string;

  @ApiProperty({
    example: 'https://example.com/cover-large.jpg',
    description: 'URL to large game cover image',
  })
  coverLarge: string;

  @ApiProperty({
    example: '2024-02-11',
    description: 'Release date of the game',
  })
  date: string;
}

export class ProviderDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the provider',
  })
  id: number;

  @ApiProperty({
    example: 'GameSoft',
    description: 'Name of the provider',
  })
  name: string;

  @ApiProperty({
    example: 'https://example.com/logo.png',
    description: 'URL to provider logo',
  })
  logo: string;
}

export class GroupDto {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the group',
  })
  id: number;

  @ApiProperty({
    example: 'Card Games',
    description: 'Name of the group',
  })
  name: string;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'Array of game IDs in this group',
    type: [Number],
  })
  games: number[];
}

export class GameDataDto {
  @ApiProperty({
    type: [GameDto],
    description: 'List of all games',
  })
  games: GameDto[];

  @ApiProperty({
    type: [ProviderDto],
    description: 'List of all providers',
  })
  providers: ProviderDto[];

  @ApiProperty({
    type: [GroupDto],
    description: 'List of all game groups',
  })
  groups: GroupDto[];
}
