import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { SleepService } from './sleep.service';
import { JwtAuthGuard } from '../configuration/jwt-auth.guard';
import { Sleep } from '../schema/sleep.schema';

@Controller('sleep')
export class SleepController {
  constructor(private readonly sleepService: SleepService) {}

  // Lưu giấc ngủ mới
  @UseGuards(JwtAuthGuard)
  @Post('save')
  async saveSleepData(
    @Req() req, // Lấy user từ request
    @Body() sleepData: { sleepTime: Date; start: Date; end: Date },
  ): Promise<Sleep> {
    const userID = req.user._id; // Ensure correct field is used

    return await this.sleepService.saveSleepData(
      userID,
      sleepData.sleepTime,
      sleepData.start,
      sleepData.end,
    );
  }

  // Lấy thông tin giấc ngủ của người dùng
  @UseGuards(JwtAuthGuard)
  @Get()
  async getSleepData(@Req() req): Promise<Sleep[]> {
    const userID = req.user._id; // Ensure correct field is used
    return await this.sleepService.getSleepData(userID);
  }
}