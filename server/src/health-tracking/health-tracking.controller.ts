import { Controller, Post, Get, Body, Req, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { HealthTrackingService } from './health-tracking.service';
import { JwtAuthGuard } from '../configuration/jwt-auth.guard';
import { HealthTracking } from '../schema/healthTracking.schema'; // Import entity của HealthTracking

@Controller('health-tracking')
export class HealthTrackingController {
  constructor(private readonly healthTrackingService: HealthTrackingService) {}

  // Lưu mục tiêu sức khỏe mới cho người dùng
  @UseGuards(JwtAuthGuard)
  @Post('save')
  async saveHealthTrackingData(
    @Req() req, // Lấy user từ request
    @Body() healthTrackingData: { 
      weightGoal: number; 
      stepsGoal: number; 
      sleepHoursGoal: number; 
      startDate: Date; 
      endDate: Date; 
    },
  ): Promise<HealthTracking> {
    const userID = req.user._id; // Đảm bảo dùng trường đúng

    return await this.healthTrackingService.saveHealthTrackingData(
      userID,
      healthTrackingData.weightGoal,
      healthTrackingData.stepsGoal,
      healthTrackingData.sleepHoursGoal,
      healthTrackingData.endDate,
    );
  }

  @UseGuards(JwtAuthGuard) // Bảo vệ API bằng JWT Auth Guard
  @Get('latest')
  async getLatestHealthTrackingData(@Req() req): Promise<HealthTracking[] | null> {
    const userID = req.user._id; // Lấy ID người dùng từ token JWT
    return await this.healthTrackingService.getLatestUpdatedHealthTracking(userID);
  }

  // Lấy thông tin mục tiêu sức khỏe của người dùng
  @UseGuards(JwtAuthGuard)
  @Get()
  async getHealthTrackingData(@Req() req): Promise<HealthTracking[] | null> {
    const userID = req.user._id; // Đảm bảo dùng trường đúng
    return await this.healthTrackingService.getHealthTrackingData(userID);
  }

  // Cập nhật mục tiêu sức khỏe của người dùng
  @UseGuards(JwtAuthGuard)
  @Put('/update')
  async updateHealthTrackingData(
    @Req() req, // Lấy user từ request
    @Body() healthTrackingData: { 
      weightGoal: number; 
      stepsGoal: number; 
      sleepHoursGoal: number; 
      startDate: Date; 
      endDate: Date; 
    },
  ): Promise<HealthTracking | null> {
    const userID = req.user._id;
    return await this.healthTrackingService.updateHealthTrackingData(
      userID,
      healthTrackingData.weightGoal,
      healthTrackingData.stepsGoal,
      healthTrackingData.sleepHoursGoal,
      healthTrackingData.startDate,
      healthTrackingData.endDate,
    );
  }

  // Xóa mục tiêu sức khỏe của người dùng
  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  async removeHealthTrackingData(@Param('userId') userId: string): Promise<HealthTracking | null> {
    return await this.healthTrackingService.removeHealthTrackingData(userId);
  }
}
