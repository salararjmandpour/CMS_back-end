import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SublabelDocument, SublabelSchema } from './sublabel.schema';

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
    type: String,
    default: '',
  })
  description: string;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: [{ type: SublabelSchema }],
    default: [],
  })
  sublabls: SublabelDocument[];
}

export type LabelDocument = Label & Document;
export const LabelSchema = SchemaFactory.createForClass(Label);
