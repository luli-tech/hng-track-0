import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RestCountriesModule } from './02-rest-countries/rest-countries.module';
import { MeModule } from './00-me/me.module';
import { StringAnalyserModule } from './01-string-analyser/string-analyser.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MeModule,
    StringAnalyserModule,
    RestCountriesModule,
  ],
})
export class AppModule {}
