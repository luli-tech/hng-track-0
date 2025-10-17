import { Injectable } from '@nestjs/common';
import { User } from 'src/types/me.types';

@Injectable()
export class MeRepository {
  private user: User = {
    email: 'olabodemicheal5@gmail.com',
    name: 'olabode micheal Ayomikun',
    stack: 'Node.js/NestJS',
  };

  async getUserProfile(): Promise<User> {
    return this.user;
  }
}
