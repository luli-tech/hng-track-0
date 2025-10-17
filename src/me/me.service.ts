import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { MeRepository } from './me.repository';
import { MeResponse, MeErrorResponse } from '../types/me.types';

@Injectable()
export class MeService {
  constructor(private readonly meRepository: MeRepository) {}

  async getProfile(): Promise<MeResponse | MeErrorResponse> {
    try {
      const user = await this.meRepository.getUserProfile();
      const catResponse = await axios.get('https://catfact.ninja/fact', {
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
