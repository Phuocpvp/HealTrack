import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SleepDocument = Sleep & Document;

@Schema()
export class Sleep {
  @Prop({ required: true })
  userId: string; // Chắc chắn là chuỗi (string) với ID người dùng

  @Prop({ required: true })
  sleepTime: number; // Có thể là tổng thời gian ngủ (theo phút, giờ, hoặc giây)

  @Prop({ required: true })
  start: Date; // Thời gian bắt đầu giấc ngủ

  @Prop({ required: true })
  end: Date; // Thời gian kết thúc giấc ngủ
}

export const SleepSchema = SchemaFactory.createForClass(Sleep);
