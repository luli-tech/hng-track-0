import { Test, TestingModule } from '@nestjs/testing';
import { RestCountriesController } from './rest-countries.controller';
import { RestCountriesService } from './rest-countries.service';

describe('RestCountriesController', () => {
  let controller: RestCountriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestCountriesController],
      providers: [RestCountriesService],
    }).compile();

    controller = module.get<RestCountriesController>(RestCountriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
