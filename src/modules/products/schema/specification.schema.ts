import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface ISpecifications {
  key: string;
  value: string;
}
// Specifications Schema
@Schema({
  versionKey: false,
})
class Specifications {
  @Prop({
    type: String,
    required: true,
  })
  key: string;

  @Prop({
    type: String,
    required: true,
  })
  value: string;
}

export const SpecificationsSchema =
  SchemaFactory.createForClass(Specifications);
