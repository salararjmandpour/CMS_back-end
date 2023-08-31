import { Injectable } from '@nestjs/common';
import { SeoRepository } from './seo.repository';
import { CreateSeoDto } from './dto/create-seo.dto';

@Injectable()
export class SeoService {
  constructor(private seoRepository: SeoRepository) {}

  async create(body: CreateSeoDto) {
    return await this.seoRepository.create(body);
  }
}
