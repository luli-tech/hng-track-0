import { Test, TestingModule } from '@nestjs/testing';
import { StringAnalyserService } from './string-analyser.service';

describe('StringAnalyserService', () => {
  let service: StringAnalyserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StringAnalyserService],
    }).compile();

    service = module.get<StringAnalyserService>(StringAnalyserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
