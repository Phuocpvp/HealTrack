import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards,Req } from '@nestjs/common';
import { BmiService } from './bmi.service';
import { JwtAuthGuard } from '../configuration/jwt-auth.guard';
import { Bmi } from '../schema/bmi.schema';

@Controller('bmi')
export class BmiController {
  constructor(private readonly bmiService: BmiService) {}
  @UseGuards(JwtAuthGuard)
  @Post('save')
  async saveBmiData(
    @Req() req, // Lấy user từ request
    @Body() bmiData: { Weigh: Number; Height: Number; BMI: Number },
  ): Promise<Bmi> {
    console.log('Received data:', bmiData); 
    const userID = req.user._id; // Ensure correct field is used

    return await this.bmiService.saveBmiData(
      userID,
      bmiData.Weigh,
      bmiData.Height,
      bmiData.BMI,
    );
  }

  // Lấy thông tin giấc ngủ của người dùng
  @UseGuards(JwtAuthGuard)
  @Get()
  async getBmiData(@Req() req): Promise<Bmi[]> {
    const userID = req.user._id; // Ensure correct field is used
    return await this.bmiService.getBmiData(userID);
  }

}
