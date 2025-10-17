// src/utils/app-config.ts
import { ConfigService } from '@nestjs/config';
import { AppExceptions } from './exceptions';

export class AppConfig {
  static PORT: number;
  static RATE_LIMIT: number;
  static RATE_TTL: number;
  static CAT_API_URL: string;

  static init(configService: ConfigService) {
    const port = configService.get<number>('PORT');
    const rateLimitMax = configService.get<number>('RATE_LIMIT');
    const rateTtl = configService.get<number>('RATE_TTL');
    const catApiUrl = configService.get<string>('CAT_API_URL');

    if (!port) AppExceptions.missingEnv('PORT');
    if (!rateLimitMax) AppExceptions.missingEnv('RATE_LIMIT');
    if (!rateTtl) AppExceptions.missingEnv('RATE_TTL');
    if (!catApiUrl) AppExceptions.missingEnv('CAT_API_URL');

    AppConfig.PORT = port!;
    AppConfig.RATE_LIMIT = rateLimitMax!;
    AppConfig.RATE_TTL = rateTtl!;
    AppConfig.CAT_API_URL = catApiUrl!;
  }
}
