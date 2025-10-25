import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateStringAnalyserDto } from './dto/create-string-analyser.dto';
import { StringAnalyserService } from './string-analyser.service';

@Controller('strings')
export class StringAnalyserController {
  constructor(private readonly service: StringAnalyserService) {}

  //  Create / Analyze String
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateStringAnalyserDto) {
    return this.service.createString(dto);
  }

  //  Get All Strings (with Filtering)
  @Get()
  findAll(@Query() query: any) {
    return this.service.getAllStrings(query);
  }

  @Get('filter-by-natural-language')
  filterByNaturalLanguage(@Query('query') query: string) {
    return this.service.filterByNaturalLanguage(query);
  }

  //  Get Specific String
  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.service.getString(value);
  }

  //  Delete String
  @Delete(':value')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('value') value: string) {
    return this.service.deleteString(value);
  }
}
