import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface ISize {
  length: number;
  height: number;
  width: number;
  weight: number;
  weightUnit: WeightUnitEnum.GRAM | WeightUnitEnum.KILOGRAM;
  dimensionsUnit: DimensionsUnitEnum.CENTIMETER | DimensionsUnitEnum.METER;
}

enum WeightUnitEnum {
  GRAM = 'gram',
  KILOGRAM = 'kilogram',
}

enum DimensionsUnitEnum {
  CENTIMETER = 'centimeter',
  METER = 'meter',
}

@Schema({
  versionKey: false,
})
class Size {
  @Prop({
    type: String,
    required: true,
    default: 0,
  })
  length: number;

  @Prop({
    type: String,
    required: true,
    default: 0,
  })
  height: number;

  @Prop({
    type: String,
    required: true,
    default: 0,
  })
  width: number;

  @Prop({
    type: String,
    required: true,
    default: 0,
  })
  weight: number;

  @Prop({
    type: String,
    required: true,
    enum: [WeightUnitEnum.GRAM, WeightUnitEnum.KILOGRAM],
  })
  weightUnit: WeightUnitEnum;

  @Prop({
    type: String,
    required: true,
    enum: [DimensionsUnitEnum.CENTIMETER, DimensionsUnitEnum.METER],
  })
  dimensionsUnit: DimensionsUnitEnum;
}
export const SizeSchema = SchemaFactory.createForClass(Size);
