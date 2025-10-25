import { Module } from '@nestjs/common';
import { RestCountriesService } from './rest-countries.service';
import { RestCountriesController } from './rest-countries.controller';

@Module({
  controllers: [RestCountriesController],
  providers: [RestCountriesService],
})
export class RestCountriesModule {}
