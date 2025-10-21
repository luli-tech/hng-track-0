import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MeModule } from './me/me.module';
import { StringAnalyserModule } from './string-analyser/string-analyser.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MeModule,
    StringAnalyserModule,
  ],
})
export class AppModule {}
