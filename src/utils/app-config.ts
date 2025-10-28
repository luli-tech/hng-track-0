import { ConfigService } from '@nestjs/config';
import { AppExceptions } from './exceptions';
import { Logger } from '@nestjs/common';
export class AppConfig {
  static PORT: number;
  static RATE_LIMIT: number;
  static RATE_TTL: number;
  static CAT_API_URL: string;
  static DATABASE_URL: string;
  static COUNTRIES_URL: string;
  static RATES_URL: string;

  static init(configService: ConfigService) {
    const logger = new Logger('AppConfig');

    const port = Number(configService.get('PORT'));
    const rateLimitMax = Number(configService.get('RATE_LIMIT'));
    const rateTtl = Number(configService.get('RATE_TTL'));
    const catApiUrl = configService.get<string>('CAT_API_URL');
    const dataBaseUrl = configService.get<string>('DATABASE_URL');
    const countriesUrl = configService.get<string>('COUNTRIES_URL');
    const ratesUrl = configService.get<string>('RATES_URL');

    if (!port) AppExceptions.missingEnv('PORT');
    if (!rateLimitMax) AppExceptions.missingEnv('RATE_LIMIT');
    if (!rateTtl) AppExceptions.missingEnv('RATE_TTL');
    if (!catApiUrl) AppExceptions.missingEnv('CAT_API_URL');
    if (!dataBaseUrl) AppExceptions.missingEnv('DATABASE_URL');
    if (!countriesUrl) AppExceptions.missingEnv('COUNTRIES_URL');
    if (!ratesUrl) AppExceptions.missingEnv('RATES_URL');

    AppConfig.PORT = port!;
    AppConfig.RATE_LIMIT = rateLimitMax!;
    AppConfig.RATE_TTL = rateTtl!;
    AppConfig.CAT_API_URL = catApiUrl!;
    AppConfig.DATABASE_URL = dataBaseUrl!;
    AppConfig.COUNTRIES_URL = countriesUrl!;
    AppConfig.RATES_URL = ratesUrl!;

    logger.log('✅ Environment variables successfully loaded:');
    logger.log(`PORT: ${AppConfig.PORT}`);
    logger.log(`RATE_LIMIT: ${AppConfig.RATE_LIMIT}`);
    logger.log(`RATE_TTL: ${AppConfig.RATE_TTL}`);
    logger.log(`CAT_API_URL: ${AppConfig.CAT_API_URL}`);
    logger.log(`DATABASE_URL: ${AppConfig.DATABASE_URL}`);
    logger.log(`COUNTRIESURL: ${AppConfig.COUNTRIES_URL}`);
    logger.log(`RATESURL: ${AppConfig.RATES_URL}`);
  }
}
