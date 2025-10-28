import { Module } from '@nestjs/common';
import { RestCountriesController } from './rest-countries.controller';
import { RestCountriesService } from './rest-countries.service';
import { PrismaService } from '../prisma/prisma.services'; 
import { SvgService } from './svgservice';
@Module({
  controllers: [RestCountriesController],
     providers: [RestCountriesService, PrismaService,SvgService],
})
export class  RestCountriesModule  {}
