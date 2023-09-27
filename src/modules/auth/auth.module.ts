import { MongooseModule } from '@nestjs/mongoose';
import { OAuth2Client } from 'google-auth-library';
import { Module, forwardRef } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { BlacklistRepository } from './blacklist.repository';
import { User, UserSchema } from '../users/schema/user.schema';
import { Blacklist, BlacklistSchema } from './models/blacklist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Blacklist.name, schema: BlacklistSchema },
    ]),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, BlacklistRepository, OAuth2Client],
  exports: [AuthService],
})
export class AuthModule {}
