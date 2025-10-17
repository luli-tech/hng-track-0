import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';
import { logger } from './utils/logger';
import { AppConfig } from './utils/app-config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  AppConfig.init(configService);

  // cors setup
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // gobal rate limitin
  app.use(
    rateLimit({
      windowMs: AppConfig.RATE_TTL,
      max: AppConfig.RATE_LIMIT,
      message: 'Too many requests, please try again later.',
    }),
  );

  await app.listen(Number(configService.get('PORT')), '0.0.0.0');
  logger.log(
    `🚀 Server running on http://localhost:${Number(configService.get('PORT'))}`,
  );
}
bootstrap();
