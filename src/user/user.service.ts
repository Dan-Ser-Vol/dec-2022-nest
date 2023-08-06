import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [];
  constructor() {}

  async getUsers() {
    return this.users;
  }

  async createUser(userDto) {
    this.users.push(userDto);
  }

  async getUserById(userId) {
    return this.users.find((user) => user.id === userId);
  }
}
