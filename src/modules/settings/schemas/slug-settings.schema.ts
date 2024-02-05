import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class SlugSettings {
  @Prop({
    type: Object,
    required: true,
  })
  postSettings: {
    categories: string;
  };
  postLableSettings: {};
  productSettings: {};
  productLableSettings: {};
}
