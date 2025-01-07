import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Inspection extends Document {
  @Prop({ required: true })
  inspectionID: string;

  @Prop({ required: true })
  vehicleID: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  inspectorName: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  comments: string;
}

export const InspectionSchema = SchemaFactory.createForClass(Inspection);
