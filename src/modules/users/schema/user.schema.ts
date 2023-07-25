import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    type: String,
  })
  fullName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  mobile: string;

  @Prop({
    type: Object,
    default: {
      code: '0',
      expiresIn: 0,
    },
  })
  otp: {
    code: string;
    expiresIn: number;
  };

  @Prop({
    type: String,
    required: true,
    default: 'USER',
    enum: ['ADMIN', 'USER'],
  })
  role: Roles;

  @Prop({
    type: String,
    default: '',
  })
  avatar: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
