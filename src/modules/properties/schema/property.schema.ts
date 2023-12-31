import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  CharacteristicDocument,
  CharacteristicSchema,
} from './characteristic.schema';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Property {
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
    type: [{ type: CharacteristicSchema }],
    default: [],
  })
  characteristics: CharacteristicDocument[];
}

export type PropertyDocument = Property & Document;
export const PropertySchema = SchemaFactory.createForClass(Property);
