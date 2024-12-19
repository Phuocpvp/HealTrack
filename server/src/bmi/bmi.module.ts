import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BmiService } from './bmi.service';
import { BmiController } from './bmi.controller';
import { Bmi,BmiSchema } from 'src/schema/bmi.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bmi.name, schema: BmiSchema }]), // Cung cấp schema cho mô hình Sleep
  ],
  controllers: [BmiController],
  providers: [BmiService],
})
export class BmiModule {}
