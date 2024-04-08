import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum SmsPanelEnum {
  'SMS.IR' = 'sms.ir',
  IPPANEL = 'ippanel',
  FARAPAYAMAK = 'farapayamak',
  MELIPAYAMAK = 'melipayamak',
  PAYAM_RESAN = 'payam-resan',
  NIKSMS = 'niksms',
  NOVIN_PAYAM = 'novin-payam',
  MEDIANA = 'mediana',
  KAVENEGAR = 'kavenegar',
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

export type SmsSettingsDocument = SmsSettings & Document;
export const SmsSettingsSchema = SchemaFactory.createForClass(SmsSettings);
