import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PropertiesService } from './properties.service';
import { PropertiesRepository } from './properties.repository';
import { PropertiesController } from './properties.controller';
import { Property, PropertySchema } from './schema/property.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Property.name, schema: PropertySchema },
    ]),
  ],
  providers: [PropertiesService, PropertiesRepository],
  controllers: [PropertiesController],
})
export class PropertiesModule {}
