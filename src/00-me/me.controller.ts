import { Controller, Get } from '@nestjs/common';
import { MeService } from './me.service';

@Controller('/')
export class MeController {
  constructor(private readonly meService: MeService) {}
  @Get()
  async root() {
    return {
      message:
        'Welcome to the hng internship. Access your profile at /me,/analyse',
    };
  }

  @Get('me')
  async getProfile() {
    return this.meService.getProfile();
  }
}
