import { Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  imports: [UsersModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
