import { Module } from '@nestjs/common';
import { StringAnalyserController } from './string-analyser.controller';
import { StringAnalyserRepository } from './string-analyser.repository';
import { StringAnalyserService } from './string-analyser.service';

@Module({
  controllers: [StringAnalyserController],
  providers: [StringAnalyserService, StringAnalyserRepository],
})
export class StringAnalyserModule {}
