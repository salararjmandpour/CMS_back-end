import { Document, Types, UpdateQuery } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class SEO {
  @Prop({
    type: Array<String>,
    default: [],
  })
  title: string[];

  @Prop({
    type: String,
    default: '',
  })
  slug: string;

  @Prop({
    type: String,
    default: '',
  })
  description: string;

  @Prop({
    type: Types.ObjectId,
  })
  product: string;

  @Prop({
    type: Types.ObjectId,
  })
  category: string;
}

export type SeoDocument = SEO & Document;
export const SeoSchema = SchemaFactory.createForClass(SEO);

SeoSchema.pre('save', async function (next) {
  if (!this.isNew || !this?.slug) return next();
  const SeoModel = this.$model(SEO.name);

  let self = this;
  let slug = self.slug;
  let count = 0;

  while (true) {
    const duplicatedSlug = await SeoModel.findOne({ slug: slug });
    console.log({ count, slug, duplicatedSlug: !!duplicatedSlug });

    if (!duplicatedSlug) {
      this.slug = count === 0 ? this.slug : `${this.slug}-${count}`;
      break;
    }

    count++;
    slug = `${self.slug}-${count}`;
  }

  next();
});

SeoSchema.pre('findOneAndUpdate', async function (next) {
  const update: UpdateQuery<SeoDocument> = this.getUpdate();

  if (update?.$set?.slug) {
    let self = update.$set;
    let slug = self.slug;
    let count = 0;

    while (true) {
      const duplicatedSlug = await this.model.findOne({
        slug,
      });

      if (!duplicatedSlug) {
        update.$set.slug =
          count === 0 ? update.$set.slug : `${update.$set.slug}-${count}`;
        next;
        break;
      }

      count++;
      slug = `${self.slug}-${count}`;
    }
  }
  next();
});
