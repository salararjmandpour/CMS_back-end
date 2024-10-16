import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class Characteristic {
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

  // @Prop({
  //   type: String,
  // })
  // color: string;

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

export interface CharacteristicDocument extends Characteristic {
  _id: string;
}
export const CharacteristicSchema =
  SchemaFactory.createForClass(Characteristic);
