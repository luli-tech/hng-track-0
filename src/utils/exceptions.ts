// src/exceptions.ts
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class AppExceptions {
  static missingEnv(key: string) {
    throw new BadRequestException(`Missing environment variable: ${key}`);
  }

  static notFound(entity: string) {
    throw new NotFoundException(`${entity} not found`);
  }

  static unauthorized(message = 'Unauthorized') {
    throw new UnauthorizedException(message);
  }

  // Add more as needed
}
