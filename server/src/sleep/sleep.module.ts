import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SleepController } from './sleep.controller';
import { SleepService } from './sleep.service';
import { Sleep, SleepSchema } from '../schema/sleep.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sleep.name, schema: SleepSchema }]), // Cung cấp schema cho mô hình Sleep
  ],
  controllers: [SleepController],
  providers: [SleepService],
})
export class SleepModule {}
