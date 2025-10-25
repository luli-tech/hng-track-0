import { Test, TestingModule } from '@nestjs/testing';
import { StringAnalyserController } from './string-analyser.controller';
import { StringAnalyserService } from './string-analyser.service';

describe('StringAnalyserController', () => {
  let controller: StringAnalyserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StringAnalyserController],
      providers: [StringAnalyserService],
    }).compile();

    controller = module.get<StringAnalyserController>(StringAnalyserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
