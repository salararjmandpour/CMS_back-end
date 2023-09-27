import { InjectModel } from '@nestjs/mongoose';
import { Blacklist } from './models/blacklist.schema';
import { Model } from 'mongoose';

export class BlacklistRepository {
  constructor(
    @InjectModel(Blacklist.name) private blacklistModel: Model<Blacklist>,
  ) {}

  add(accessToken?: string, refreshToken?: string) {
    return this.blacklistModel.create({ accessToken, refreshToken });
  }
}
