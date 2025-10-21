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

  // 1️⃣ Create / Analyze String
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateStringAnalyserDto) {
    return this.service.createString(dto);
  }

  // 2️⃣ Get All Strings (with Filtering)
  @Get()
  findAll(@Query() query: any) {
    return this.service.getAllStrings(query);
  }

  // 3️⃣ Get Specific String
  @Get(':value')
  findOne(@Param('value') value: string) {
    return this.service.getString(value);
  }

  // 4️⃣ Delete String
  @Delete(':value')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('value') value: string) {
    return this.service.deleteString(value);
  }

  // 5️⃣ Natural Language Filtering
  @Get('filter-by-natural-language')
  filterByNaturalLanguage(@Query('query') query: string) {
    return this.service.filterByNaturalLanguage(query);
  }
}
