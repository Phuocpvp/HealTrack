
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BmiDocument = Bmi & Document ;

@Schema()
export class Bmi {
  @Prop({ required: true })
  userId: string; 

  @Prop({ required: true })
  Weigh: number;

  @Prop({ required: true })
  BMI: number;

  @Prop({ required: true })
  Height: number;
}

export const BmiSchema = SchemaFactory.createForClass(Bmi);
