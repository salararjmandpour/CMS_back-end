import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document as MongooseDocument } from 'mongoose';

@Schema({
  versionKey: false,
  strict: 'throw',
})
export class EmailSettings {
  @Prop({
    type: String,
  })
  host: string;

  @Prop({
    type: String,
  })
  port: string;

  @Prop({
    type: String,
  })
  user: string;

  @Prop({
    type: String,
  })
  pass: string;

  @Prop({
    type: String,
  })
  senderEmail: string;
}

export type EmailSettingsDocument = EmailSettings & MongooseDocument;
export const EmailSettingsSchema = SchemaFactory.createForClass(EmailSettings);
