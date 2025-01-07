import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Driver extends Document {
  @Prop({ required: true })
  driverID: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  licenseNumber: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  status: string;
}

export const DriverSchema = SchemaFactory.createForClass(Driver);
