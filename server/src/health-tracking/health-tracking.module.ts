import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthTrackingService } from './health-tracking.service';
import { HealthTrackingController } from './health-tracking.controller';
import { HealthTracking, HealthTrackingSchema } from '../schema/healthTracking.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: HealthTracking.name, schema: HealthTrackingSchema }])],
  controllers: [HealthTrackingController],
  providers: [HealthTrackingService],
})
export class HealthTrackingModule {}
