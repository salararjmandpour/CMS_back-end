import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
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

  findManyByIds(ids: string[]) {
    return this.sheetsModel.find({ _id: { $in: ids } });
  }

  updateOne(_id: string, data: UpdateSheetInput) {
    return this.sheetsModel.updateOne({ _id }, { $set: data });
  }

  findAll(
    filter?: FilterQuery<Sheet>,
    projection?: ProjectionType<Sheet>,
    options?: QueryOptions<Sheet>,
  ) {
    return this.sheetsModel.find(filter, projection, options);
  }

  incrementViewCount(sheetId: string) {
    return this.sheetsModel.findOneAndUpdate(
      { _id: sheetId },
      { $inc: { view: 1 } },
      { new: true },
    );
  }

  deleteManyByIds(sheetIds: string[]): Promise<any> {
    return this.sheetsModel.deleteMany({ _id: { $in: sheetIds } });
  }
}
