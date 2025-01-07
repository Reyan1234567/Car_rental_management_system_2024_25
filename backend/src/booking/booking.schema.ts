import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
  @Prop()
  bookingID: string;

  @Prop()
  vehicleID: string;

  @Prop()
  driverID: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  totalPrice: number;

  @Prop()
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
