import { Injectable } from '@nestjs/common';
import { usersMock } from './users.mock';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = usersMock;

  async findOne(username: string): Promise<UserDto | undefined> {
    return Promise.resolve(
      this.users.find((user) => user.username === username),
    );
  }
}
