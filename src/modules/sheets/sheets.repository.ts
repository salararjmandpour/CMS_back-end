import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sheet } from './schema/sheet.schema';
import {
  CreateSheetInput,
  UpdateSheetInput,
} from 'src/core/interfaces/sheet.interface';

@Injectable()
export class SheetsRepository {
  constructor(@InjectModel(Sheet.name) private sheetsModel: Model<Sheet>) {}

  create(data: CreateSheetInput) {
    return this.sheetsModel.create({
      ...data,
      view: 0,
    });
  }

  findOneById(id: string) {
    return this.sheetsModel.findById(id);
  }

  updateOne(_id: string, data: UpdateSheetInput) {
    return this.sheetsModel.updateOne({ _id }, { $set: data });
  }
}
