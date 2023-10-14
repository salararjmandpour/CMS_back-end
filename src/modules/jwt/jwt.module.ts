import { Global, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UserModule } from '../users/users.module';

@Global()
@Module({
  imports: [UserModule],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
