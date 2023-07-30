import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  emailPattern,
  persianNationalId,
} from 'src/core/constants/pattern.constant';

enum Roles {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

enum Nationality {
  IRANIAN = 'iranian',
  FOREIGNER = 'foreigner',
}

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User {
  @Prop({
    type: String,
  })
  firstName: string;

  @Prop({
    type: String,
  })
  lastName: string;

  @Prop({
    type: String,
  })
  mobile: string;

  @Prop({
    validate: {
      validator: (value: string) => {
        return emailPattern.test(value);
      },
      message: (props: any) => `${props.value} is not a valid email!`,
    },
  })
  email: string;

  @Prop({
    type: String,
  })
  password: string;

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
  })
  accessToken: string;

  @Prop({
    type: String,
  })
  refreshToken: string;

  @Prop({
    type: String,
    default: Roles.USER,
    enum: [Roles.ADMIN, Roles.USER],
  })
  role: Roles;

  @Prop({
    type: String,
    default: '',
  })
  avatar: string;

  @Prop({
    type: String,
    enum: [Nationality.IRANIAN, Nationality.FOREIGNER],
  })
  nationality: string;

  @Prop({
    type: String,
    enum: [Gender.MALE, Gender.FEMALE],
  })
  gender: string;

  @Prop({
    validate: {
      validator: (value: string) => {
        return persianNationalId.test(value);
      },
      message: (props: any) =>
        `${props.value} is not a valid Iranian national ID!`,
    },
  })
  nationalId: string;

  @Prop({
    type: String,
  })
  province: string;

  @Prop({
    type: String,
  })
  city: string;

  @Prop({
    type: String,
  })
  postalCode: string;

  @Prop({
    type: String,
  })
  address: string;

  @Prop({
    type: String,
  })
  birthdate: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
