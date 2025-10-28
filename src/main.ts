import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';
import { logger } from './utils/logger';
import { AppConfig } from './utils/app-config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  AppConfig.init(configService);

  const port = Number(process.env.PORT) || 3000;

  //  Enable trust proxy correctly (for Railway, Render, etc.)
  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  //  Enable CORS
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Apply global rate limiting
  app.use(
    rateLimit({
      windowMs: AppConfig.RATE_TTL, // e.g. 15 * 60 * 1000
      max: AppConfig.RATE_LIMIT,    // e.g. 100
      standardHeaders: true,        // add helpful RateLimit headers
      legacyHeaders: false,         // disable X-RateLimit headers
      message: 'Too many requests, please try again later.',
      keyGenerator: (req) => req.ip || req.headers['x-forwarded-for'] || 'unknown', // fallback
    }),
  );

  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Server running on http://localhost:${port}`);
}

bootstrap();
