// src/02-rest-countries/rest-countries.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  Res,
  HttpCode,
} from '@nestjs/common';
import { RestCountriesService } from './rest-countries.service';
import type { Response } from 'express';
import { existsSync, readFileSync } from 'fs';

@Controller('restCountries')
export class RestCountriesController {
  constructor(private readonly service: RestCountriesService) {}

  @Post('countries/refresh')
  @HttpCode(200)
  async refresh() {
    return this.service.refreshCountries();
  }

  @Get('countries')
  async getAll(@Query() query: any) {
    return this.service.getAll(query);
  }

  @Get('countries/image')
  async getImage(@Res() res: Response) {
    const svg = await this.service.getSvg();
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.send(svg);
  }

  @Get('countries/:name')
  async getOne(@Param('name') name: string) {
    return this.service.getByName(name);
  }

  @Delete('countries/:name')
  async delete(@Param('name') name: string) {
    return this.service.deleteByName(name);
  }

  @Get('status')
  async getStatus() {
    return this.service.getStatus();
  }
}
