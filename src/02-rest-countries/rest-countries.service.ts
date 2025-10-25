import { Injectable } from '@nestjs/common';
import { CreateRestCountryDto } from './dto/create-rest-country.dto';
import { UpdateRestCountryDto } from './dto/update-rest-country.dto';

@Injectable()
export class RestCountriesService {
  create(createRestCountryDto: CreateRestCountryDto) {
    return 'This action adds a new restCountry';
  }

  findAll() {
    return `This action returns all restCountries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restCountry`;
  }

  update(id: number, updateRestCountryDto: UpdateRestCountryDto) {
    return `This action updates a #${id} restCountry`;
  }

  remove(id: number) {
    return `This action removes a #${id} restCountry`;
  }
}
