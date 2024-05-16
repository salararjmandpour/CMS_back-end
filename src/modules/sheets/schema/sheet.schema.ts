import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/modules/users/schema/user.schema';

export enum StatusEnum {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Sheet {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: Array,
    required: true,
  })
  description: object[];

  @Prop({
    type: Types.ObjectId,
    required: true,
    ref: User.name,
  })
  writer: string;

  @Prop({
    type: Number,
    default: 0,
  })
  view: number;

  @Prop({
    type: String,
    enum: [StatusEnum.PUBLISHED, StatusEnum.DRAFT],
    default: StatusEnum.PUBLISHED,
  })
  status: StatusEnum;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: String,
  })
  slugUrl: string;

  @Prop({
    type: String,
  })
  idUrl: string;

  @Prop({
    type: String,
    unique: true,
  })
  slug: string;
}

export type SheetDocument = Sheet & Document;
export const SheetSchema = SchemaFactory.createForClass(Sheet);
