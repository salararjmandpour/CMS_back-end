import { Injectable, HttpStatus } from '@nestjs/common';
import { SettingsRepository } from './settings.repository';
import { ResponseFormat } from 'src/core/interfaces/response.interface';

@Injectable()
export class SettingsService {
  constructor(readonly settingsRepository: SettingsRepository) {}

  async getSettings(): Promise<ResponseFormat<any>> {
    
    return {
      statusCode: HttpStatus.OK,
    };
  }
}
