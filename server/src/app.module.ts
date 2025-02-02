import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DiseaseModule } from './disease/disease.module';
import { HealthTrackingModule } from './health-tracking/health-tracking.module';
import { AnswerSchema } from './schema/answer.schema';
import { AnswerModule } from './answer/answer.module';
import { SleepController } from './sleep/sleep.controller';
import { SleepService } from './sleep/sleep.service';
import { SleepModule } from './sleep/sleep.module';
// import { BmiModule } from './bmi/bmi.module';
// import { BmiModule } from './bmi/bmi.module';
import { BmiModule } from './bmi/bmi.module';
import { TargetModule } from './target/target.module';
@Module({
   imports: [
      ConfigModule.forRoot(),
      MongooseModule.forRoot(process.env.DATABASE),
      AuthModule,
      UserModule,
      DiseaseModule,
      HealthTrackingModule,
      AnswerModule,
      SleepModule,
      BmiModule,
      TargetModule
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}