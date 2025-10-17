import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MeRepository } from './me.repository';
import { MeResponse, MeErrorResponse } from '../utils/types';
import { AppConfig } from 'src/utils/app-config';
@Injectable()
export class MeService {
  constructor(private readonly meRepository: MeRepository) {}

  async getProfile(): Promise<MeResponse | MeErrorResponse> {
    try {
      const user = await this.meRepository.getUserProfile();

      const catResponse = await axios.get(AppConfig.CAT_API_URL, {
        timeout: 5000,
      });

      return {
        status: 'success',
        user,
        timestamp: new Date().toISOString(),
        fact: catResponse.data?.fact || 'Cats are awesome creatures!',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to fetch cat fact. Please try again later.',
        timestamp: new Date().toISOString(),
      };
    }
  }
}
