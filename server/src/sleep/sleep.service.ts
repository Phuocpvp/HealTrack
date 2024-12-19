import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sleep } from '../schema/sleep.schema';

@Injectable()
export class SleepService {
  constructor(
    @InjectModel(Sleep.name) private readonly sleepModel: Model<Sleep>,
  ) {}

  // Lưu thông tin giấc ngủ
  async saveSleepData(userID: string, sleepTime: Date, start: Date, end: Date): Promise<Sleep> {
    const newSleepData = new this.sleepModel({
      userId: userID,
      sleepTime,
      start,
      end,
    });

    return await newSleepData.save();
  }

  // Lấy thông tin giấc ngủ của người dùng
  async getSleepData(userID: string): Promise<Sleep[]> {
    return this.sleepModel.find({ userID });
  }
}
