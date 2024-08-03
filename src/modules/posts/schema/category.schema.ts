import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface ICategoryItem {
  _id: string;
  title: string;
}

export interface ICategory {
  value: ICategoryItem;
}

// Specifications Schema
@Schema({
  versionKey: false,
})
class Category {

  @Prop({
    type: Object,
    required: true,
  })
  value: string;
}

export const CategorySchema =
  SchemaFactory.createForClass(Category);
