import { Test, TestingModule } from '@nestjs/testing';
import { RestCountriesService } from './rest-countries.service';

describe('RestCountriesService', () => {
  let service: RestCountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestCountriesService],
    }).compile();

    service = module.get<RestCountriesService>(RestCountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
