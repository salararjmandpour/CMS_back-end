import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { SeoService } from './seo.service';
import { CreateSeoDto } from './dto/create-seo.dto';
import { JoiValidatorPipe } from 'src/core/pipes/joi-validator.pipe';
import { createSeoValidator } from './validators/create-seo-validator';

@Controller('seo')
export class SeoController {
  constructor(private seoService: SeoService) {}

  @Post()
  @UsePipes(new JoiValidatorPipe(createSeoValidator))
  create(@Body() body: CreateSeoDto) {
    return this.seoService.create(body);
  }
}
