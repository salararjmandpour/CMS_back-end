import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

@Schema({
  versionKey: false,
  strict: 'throw',
})
export class EmailSettings {
  @Prop({
    type: String,
    required: true,
  })
  host: string;

  @Prop({
    type: String,
    required: true,
  })
  port: string;

  @Prop({
    type: String,
    required: true,
  })
  user: string;

  @Prop({
    type: String,
    required: true,
  })
  pass: string;

  @Prop({
    type: String,
    required: true,
  })
  senderEmail: string;
}

export type EmailSettingsDocument = EmailSettings & MongooseDocument;
export const EmailSettingsSchema = SchemaFactory.createForClass(EmailSettings);
