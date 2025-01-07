import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Timebound extends Document {
  @Prop({ required: true })
  timeBoundID: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  description: string;
}

export const TimeboundSchema = SchemaFactory.createForClass(Timebound);
