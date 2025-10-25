import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RestCountriesService } from './rest-countries.service';
import { CreateRestCountryDto } from './dto/create-rest-country.dto';
import { UpdateRestCountryDto } from './dto/update-rest-country.dto';

@Controller('rest-countries')
export class RestCountriesController {
  constructor(private readonly restCountriesService: RestCountriesService) {}

  @Post()
  create(@Body() createRestCountryDto: CreateRestCountryDto) {
    return this.restCountriesService.create(createRestCountryDto);
  }

  @Get()
  findAll() {
    return this.restCountriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.restCountriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestCountryDto: UpdateRestCountryDto) {
    return this.restCountriesService.update(+id, updateRestCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restCountriesService.remove(+id);
  }
}
