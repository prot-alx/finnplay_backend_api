import { Injectable } from '@nestjs/common';
import { usersMock } from './users.mock';
import { Users, User } from './users.type';

@Injectable()
export class UsersService {
  private readonly users: Users = usersMock;

  async findOne(username: string): Promise<User | undefined> {
    return Promise.resolve(
      this.users.find((user) => user.username === username),
    );
  }
}
