// src/rest-countries/dto/create-rest-country.dto.ts
import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';


export class CreateRestCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  capital?: string;

  @IsString()
  @IsOptional()
  region?: string;

  @IsNumber()
  @IsNotEmpty()
  population: number;


  @IsString()
  @IsOptional()
  currency_code?: string;

  @IsNumber()
  @IsOptional()
  exchange_rate?: number;

  @IsNumber()
  @IsOptional()
  estimated_gdp?: number;

  @IsString()
  @IsOptional()
  flag_url?: string;
}
