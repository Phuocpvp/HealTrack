import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bmi } from '../schema/bmi.schema';
@Injectable()
export class BmiService {
  constructor(
    @InjectModel(Bmi.name) private readonly bmiModel: Model<Bmi>,
  ) {}

  async saveBmiData(userID: string, Weigh: Number, Height: Number, BMI: Number): Promise<Bmi> {
    const newBMIdata = new this.bmiModel({
      userId: userID,
      Weigh,
      Height,
      BMI,
    });

    return await newBMIdata.save();
  }

  // Lấy thông tin giấc ngủ của người dùng
  async getBmiData(userID: string): Promise<Bmi[]> {
    return this.bmiModel.find({ userID });
  }
}
