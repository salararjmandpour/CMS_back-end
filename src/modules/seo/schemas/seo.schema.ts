import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class SEO {
  @Prop({
    type: Array<String>,
  })
  variables: string;

  @Prop({
    type: String,
  })
  namek: string;

  @Prop({
    type: String,
  })
  description: string;
}

export type SEODocument = SEO & Document;
export const SEOSchema = SchemaFactory.createForClass(SEO);
