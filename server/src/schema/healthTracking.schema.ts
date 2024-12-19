import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HealthTrackingDocument = HealthTracking & Document;

@Schema({ timestamps: true })
export class HealthTracking {
  @Prop({ required: true })
  userId: string; // ID của người dùng

  @Prop({ required: true })
  weightGoal: number; // Cân nặng mục tiêu

  @Prop({ required: true })
  stepsGoal: number; // Số bước chân mục tiêu

  @Prop({ required: true })
  sleepHoursGoal: number; // Số giờ ngủ mục tiêu

  @Prop({ required: true, type: Date })
  startDate: Date; // Ngày bắt đầu

  @Prop({ required: true, type: Date })
  endDate: Date; // Ngày kết thúc

  @Prop({ required: false, type: Date })
  completedAt?: Date; // Ngày hoàn thành (không bắt buộc)

  // Tính tổng số ngày giữa startDate và endDate
  get totalDays(): number {
    const diffTime = Math.abs(this.endDate.getTime() - this.startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Số ngày giữa startDate và endDate
  }
}

export const HealthTrackingSchema = SchemaFactory.createForClass(HealthTracking);
