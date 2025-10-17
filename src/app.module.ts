import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MeModule } from './me/me.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MeModule,
  ],
})
export class AppModule {}
