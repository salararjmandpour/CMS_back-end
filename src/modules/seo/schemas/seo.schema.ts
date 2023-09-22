import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class SEO {
  @Prop({
    type: Array<String>,
    required: true,
  })
  title: string[];

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  slug: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
  })
  product: string;

  @Prop({
    type: Types.ObjectId,
  })
  category: string;
}

export type SeoDocument = SEO & Document;
export const SeoSchema = SchemaFactory.createForClass(SEO);
