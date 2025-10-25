import { PartialType } from '@nestjs/mapped-types';
import { CreateRestCountryDto } from './create-rest-country.dto';

export class UpdateRestCountryDto extends PartialType(CreateRestCountryDto) {}
