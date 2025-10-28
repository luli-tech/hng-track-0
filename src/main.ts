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
  const port = Number(process.env.PORT) || 3000
  // cors setup
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  // gobal rate limitin
  app.set("trust proxy", 1);
  app.use(
    rateLimit({
      windowMs: AppConfig.RATE_TTL,
      max: AppConfig.RATE_LIMIT,
      message: 'Too many requests, please try again later.',
    }),
  );

  await app.listen(port, '0.0.0.0');
  logger.log(
    `🚀 Server running on http://localhost:${port})}`,
  );
}
bootstrap();
