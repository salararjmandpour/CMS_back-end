import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schema/user.schema';
import { ProductsModule } from '../products/products.module';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ProductsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
