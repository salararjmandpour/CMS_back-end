import { Body, Controller, Post } from '@nestjs/common';
import { SeoService } from './seo.service';
import { CreateSeoDto } from './dto/create-seo.dto';

@Controller('seo')
export class SeoController {
  constructor(private seoService: SeoService) {}

  @Post()
  create(@Body() body: CreateSeoDto) {
    return this.seoService.create(body);
  }
}
