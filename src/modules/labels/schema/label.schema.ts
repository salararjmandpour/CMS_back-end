import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SublabelDocument, SublabelSchema } from './sublabel.schema';

export enum TypeEnum {
  PRODUCT = 'product',
  POST = 'post',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Label {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  slug: string;

  @Prop({
    type: Array,
    required: true,
  })
  description: object;

  @Prop({
    type: String,
    enum: [TypeEnum.PRODUCT, TypeEnum.POST],
    required: true,
  })
  type: TypeEnum;

  @Prop({
    type: String,
  })
  image: string;

  // @Prop({
  //   type: [{ type: SublabelSchema }],
  //   default: [],
  // })
  // sublabls: SublabelDocument[];
}

export type LabelDocument = Label & Document;
export const LabelSchema = SchemaFactory.createForClass(Label);
