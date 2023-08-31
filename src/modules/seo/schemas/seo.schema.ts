import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class SEO {
  @Prop({
    type: Array<String>,
  })
  title: string[];

  @Prop({
    type: String,
  })
  namek: string;

  @Prop({
    type: String,
  })
  description: string;
}

export type SeoDocument = SEO & Document;
export const SeoSchema = SchemaFactory.createForClass(SEO);
