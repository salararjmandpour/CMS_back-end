import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { JwtModule } from './modules/jwt/jwt.module';
import { SmsModule } from './modules/sms/sms.module';
import { EmailModule } from './modules/email/email.module';
import { RedisModule } from './modules/redis/redis.module';
import { FileModule } from './modules/file/file.module';
import { UserModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminAuthModule } from './modules/admin-auth/admin-auth.module';
import { SettingsModule } from './modules/settings/settings.module';
import { OrderModule } from './modules/order/order.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { SeoModule } from './modules/seo/seo.module';
import { MainEmailModule } from './modules/main-email/main-email.module';
import { SheetsModule } from './modules/sheets/sheets.module';
import { PostsModule } from './modules/posts/posts.module';
import { DiscountCodeModule } from './modules/discount-code/discount-code.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { LabelsModule } from './modules/labels/labels.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    RedisModule,
    JwtModule,
    SmsModule,
    EmailModule,
    RedisModule,
    FileModule,
    UserModule,
    AuthModule,
    AdminAuthModule,
    SettingsModule,
    OrderModule,
    ProductsModule,
    CategoriesModule,
    GalleryModule,
    SeoModule,
    MainEmailModule,
    SheetsModule,
    PostsModule,
    DiscountCodeModule,
    PropertiesModule,
    LabelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
