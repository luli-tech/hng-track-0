import { Module } from '@nestjs/common';
import { MeController } from './me/me.controller';
import { MeModule } from './me/me.module';

@Module({
  imports: [MeModule],
  controllers: [MeController],
})
export class AppModule {}
