import { ConfigService } from '@nestjs/config';
import { AppExceptions } from './exceptions';
import { Logger } from '@nestjs/common';
export class AppConfig {
  static PORT: number;
  static RATE_LIMIT: number;
  static RATE_TTL: number;
  static CAT_API_URL: string;

  static init(configService: ConfigService) {
    const logger = new Logger('AppConfig');

    const port = Number(configService.get('PORT'));
    const rateLimitMax = Number(configService.get('RATE_LIMIT'));
    const rateTtl = Number(configService.get('RATE_TTL'));
    const catApiUrl = configService.get<string>('CAT_API_URL');

    if (!port) AppExceptions.missingEnv('PORT');
    if (!rateLimitMax) AppExceptions.missingEnv('RATE_LIMIT');
    if (!rateTtl) AppExceptions.missingEnv('RATE_TTL');
    if (!catApiUrl) AppExceptions.missingEnv('CAT_API_URL');

    AppConfig.PORT = port!;
    AppConfig.RATE_LIMIT = rateLimitMax!;
    AppConfig.RATE_TTL = rateTtl!;
    AppConfig.CAT_API_URL = catApiUrl!;

    logger.log('✅ Environment variables successfully loaded:');
    logger.log(`PORT: ${AppConfig.PORT}`);
    logger.log(`RATE_LIMIT: ${AppConfig.RATE_LIMIT}`);
    logger.log(`RATE_TTL: ${AppConfig.RATE_TTL}`);
    logger.log(`CAT_API_URL: ${AppConfig.CAT_API_URL}`);
  }
}
