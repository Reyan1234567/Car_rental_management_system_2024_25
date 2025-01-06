import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Booking extends Document {
  @Prop({ required: true })
  bookingID: string;

  @Prop({ required: true })
  vehicleID: string;

  @Prop({ required: true })
  driverID: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  totalPrice: number;

  @Prop({ required: true })
  status: string;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
