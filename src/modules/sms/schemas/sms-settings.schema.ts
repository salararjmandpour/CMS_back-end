import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

export enum SmsPanelEnum {
  SMS_IR = 'sms.ir',
  FARAPAYAMAK = 'farapayamak',
  MELIPAYAMAK = 'melipayamak',
  PAYAM_RESAN = 'payam-resan',
  NIKSMS = 'niksms',
  FARAZSMS = 'farazsms',
  NOVIN_PAYAM = 'novin-payam',
  MEDIANA = 'mediana',
}

@Schema({
  versionKey: false,
  strict: 'throw',
})
export class SmsSettings {
  @Prop({
    type: String,
    required: true,
  })
  panel: SmsPanelEnum;

  @Prop({
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  senderNumber: string;
}

export type SmsSettingsDocument = SmsSettings & MongooseDocument;
export const SmsSettingsSchema = SchemaFactory.createForClass(SmsSettings);
