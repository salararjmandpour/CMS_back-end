import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class Sublabel {
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

export interface SublabelDocument extends Sublabel {
  _id: string;
}
export const SublabelSchema = SchemaFactory.createForClass(Sublabel);
