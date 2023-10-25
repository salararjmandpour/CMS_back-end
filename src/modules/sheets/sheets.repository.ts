import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sheet } from './schema/sheet.schema';
import { CreateSheetInput } from 'src/core/interfaces/sheet.interface';

@Injectable()
export class SheetsRepository {
  constructor(@InjectModel(Sheet.name) private sheetsModel: Model<Sheet>) {}

  create(data: CreateSheetInput) {
    return this.sheetsModel.create({
      ...data,
      view: 0,
    });
  }
}
