import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SeoModule } from '../seo/seo.module';
import { SheetsService } from './sheets.service';
import { SheetsRepository } from './sheets.repository';
import { SheetsController } from './sheets.controller';
import { Sheet, SheetSchema } from './schema/sheet.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sheet.name, schema: SheetSchema }]),
    SeoModule,
  ],
  providers: [SheetsService, SheetsRepository],
  controllers: [SheetsController],
})
export class SheetsModule {}
