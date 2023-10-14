import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Address {
  @Prop({
    type: String,
    required: true,
  })
  first_name: string;

  @Prop({
    type: String,
    required: true,
  })
  last_name: string;

  @Prop({
    type: Number,
    required: true,
  })
  mobile: number;

  @Prop({
    type: Number,
  })
  telephone: number;

  @Prop({
    type: String,
    required: true,
  })
  titleAddress: string;

  @Prop({
    type: String,
    required: true,
  })
  state: string;

  @Prop({
    type: String,
    required: true,
  })
  city: string;

  @Prop({
    type: String,
    required: true,
  })
  postalAddress: string;

  @Prop({
    type: Number,
  })
  postalCode: number;
}

export type AddressDocument = Address & Document;
export const AddressSchema = SchemaFactory.createForClass(Address);
