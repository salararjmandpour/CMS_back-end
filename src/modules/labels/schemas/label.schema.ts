import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
    type: Object,
    default: {},
  })
  description: Object;


  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: String,
    enum: [TypeEnum.PRODUCT, TypeEnum.POST],
    required: true,
  })
  type: TypeEnum;


  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  supplier?: string;

  @Prop({
    type: Boolean,
  })
  isWthOutLabel?: boolean;

  @Prop({
    type: String,
    unique: true,

  })
  slugUrl: string;

  @Prop({
    type: String,
  })
  idUrl: string;
}

export type LabelDocument = Label & Document;
export const LabelSchema = SchemaFactory.createForClass(Label);
