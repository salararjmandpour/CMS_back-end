import { Module } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelsController } from './labels.controller';
import { LabelsRepository } from './labels.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Label, LabelSchema } from './schema/label.schema';
import { SeoModule } from '../seo/seo.module';

@Module({
  imports: [
    SeoModule,
    MongooseModule.forFeature([{ name: Label.name, schema: LabelSchema }]),
  ],
  providers: [LabelsService, LabelsRepository],
  controllers: [LabelsController],
})
export class LabelsModule {}
