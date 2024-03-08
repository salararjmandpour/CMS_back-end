import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface ISpecificationsItem {
  _id: string;
  title: string;
}

export interface ISpecifications {
  key: ISpecificationsItem;
  value: ISpecificationsItem;
}

// Specifications Schema
@Schema({
  versionKey: false,
})
class Specifications {
  @Prop({
    type: Object,
    required: true,
  })
  key: string;

  @Prop({
    type: Object,
    required: true,
  })
  value: string;
}

export const SpecificationsSchema =
  SchemaFactory.createForClass(Specifications);
