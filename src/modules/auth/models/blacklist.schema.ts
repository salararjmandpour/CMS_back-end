import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class Blacklist {
  @Prop({
    type: String,
  })
  accessToken: string;

  @Prop({
    type: String,
  })
  refreshToken: string;
}

export const BlacklistSchema = SchemaFactory.createForClass(Blacklist);
