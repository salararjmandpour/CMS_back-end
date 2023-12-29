import { Document } from 'mongoose';
import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Characteristic {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
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
  color: string;

  @Prop({
    type: String,
  })
  image: string;

  @Prop({
    type: Number,
    default: 0,
  })
  equivalent: number;
}

export type CharacteristicDocument = Characteristic & Document;
export const CharacteristicSchema =
  SchemaFactory.createForClass(Characteristic);
