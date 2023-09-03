import * as bcrypt from 'bcryptjs';
import { Document } from 'mongoose';
import { Document as MongooseDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  emailPattern,
  persianNationalId,
} from 'src/core/constants/pattern.constant';
import { Product } from 'src/modules/products/schema/product.schema';

export enum RolesEnum {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  SUPPLIER = 'SUPPLIER',
  USER = 'USER',
}

enum NationalityEnum {
  IRANIAN = 'iranian',
  FOREIGNER = 'foreigner',
}

enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export enum AuthProviderEnum {
  GOOGLE = 'GOOGLE',
  OTP = 'OTP',
  LOCAL = 'LOCAL',
}

@Schema({
  timestamps: true,
  versionKey: false,
})
export class User extends Document {
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
    enum: [
      AuthProviderEnum.GOOGLE,
      AuthProviderEnum.OTP,
      AuthProviderEnum.LOCAL,
    ],
    default: AuthProviderEnum.OTP,
  })
  authProvider: string;

  @Prop({
    type: String,
    min: 8,
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
    default: RolesEnum.USER,
    enum: [RolesEnum.SUPERADMIN, RolesEnum.USER],
  })
  role: RolesEnum;

  @Prop({
    type: String,
    default: '',
  })
  avatar: string;

  @Prop({
    type: String,
    enum: [NationalityEnum.IRANIAN, NationalityEnum.FOREIGNER],
  })
  nationality: string;

  @Prop({
    type: String,
    enum: [GenderEnum.MALE, GenderEnum.FEMALE],
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

  @Prop({
    type: [Types.ObjectId],
    default: [],
    ref: Product.name,
  })
  wishlist: string[];

  comparePassword: Function;
}

export type UserDocumentOptional = Partial<User & MongooseDocument>;
export type UserDocument = User & MongooseDocument;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

UserSchema.methods.comparePassword = function (enteredPassword: string) {
  console.log('Inside comparePassword: ', {
    enteredPassword,
    password: this.password,
  });
  return bcrypt.compareSync(enteredPassword, this.password);
};

UserSchema.pre('save', function (next) {
  if (!this.isModified('password') || !this.isNew) return next();
  if (!this.password) return next();

  const salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});
