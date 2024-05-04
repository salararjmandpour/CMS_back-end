import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

interface ILabelsItem {
  _id: string;
  title: string;
}

export interface ILabels {
  value: ILabelsItem;
}

// Specifications Schema
@Schema({
  versionKey: false,
})
class Labels {

  @Prop({
    type: Object,
    required: true,
  })
  value: string;
}

export const LabelsSchema =
  SchemaFactory.createForClass(Labels);
