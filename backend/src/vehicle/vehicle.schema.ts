import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vehicle extends Document {
  @Prop({ required: true })
  vehicleID: string;

  @Prop({ required: true })
  licensePlate: string;

  @Prop({ required: true })
  make: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  mileage: number;

  @Prop()
  isOccupied: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ required: true })
  rentalPricePerDay: number;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
