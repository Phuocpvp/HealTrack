import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HealthTracking } from '../schema/healthTracking.schema'; // Import entity của HealthTracking

@Injectable()
export class HealthTrackingService {
  constructor(
    @InjectModel(HealthTracking.name) private readonly healthTrackingModel: Model<HealthTracking>,
  ) {}

  // Lưu thông tin mục tiêu sức khỏe của người dùng
  async saveHealthTrackingData(
    userID: string,
    weightGoal: number,
    stepsGoal: number,
    sleepHoursGoal: number,
    endDate: Date, // Thay vì startDate từ client, sẽ tự động lấy ngày hiện tại
  ): Promise<HealthTracking> {
    const currentDate = new Date(); // Lấy ngày hiện tại làm startDate
  
    const newHealthTrackingData = new this.healthTrackingModel({
      userId: userID,
      weightGoal,
      stepsGoal,
      sleepHoursGoal,
      startDate: currentDate, // Sử dụng ngày hiện tại cho startDate
      endDate, // Vẫn sử dụng endDate do client gửi lên
    });
  
    // Lưu dữ liệu vào cơ sở dữ liệu
    return await newHealthTrackingData.save();
  }
  

  // Lấy tất cả thông tin mục tiêu sức khỏe của người dùng
  async getAllHealthTrackingData(): Promise<HealthTracking[]> {
    return this.healthTrackingModel.find().exec();
  }

  // Lấy thông tin mục tiêu sức khỏe của người dùng
  async getHealthTrackingData(userID: string): Promise<HealthTracking[]> {
    return this.healthTrackingModel.find({ userId: userID }).exec();
  }

  // Lấy bản ghi có thuộc tính updatedAt gần với ngày hiện tại nhất
  async getLatestUpdatedHealthTracking(userID: string): Promise<HealthTracking[] | null> {
    return this.healthTrackingModel
      .find({ userId: userID }) // Tìm tất cả các bản ghi của người dùng
      .sort({ updatedAt: -1 })   // Sắp xếp theo updatedAt giảm dần (mới nhất trước)
      .limit(1)                  // Lấy chỉ một bản ghi đầu tiên
      .exec();                   // Thực thi truy vấn và trả về kết quả
  }


  // Cập nhật mục tiêu sức khỏe
  async updateHealthTrackingData(
    userID: string,
    weightGoal: number,
    stepsGoal: number,
    sleepHoursGoal: number,
    startDate: Date,
    endDate: Date,
  ): Promise<HealthTracking | null> {
    return this.healthTrackingModel.findOneAndUpdate(
      { userId: userID },
      { weightGoal, stepsGoal, sleepHoursGoal, startDate, endDate },
      { new: true }, // Trả về đối tượng đã cập nhật
    ).exec();
  }

  // Xóa thông tin mục tiêu sức khỏe của người dùng
  async removeHealthTrackingData(userID: string): Promise<HealthTracking | null> {
    return this.healthTrackingModel.findOneAndDelete({ userId: userID }).exec();
  }
}
