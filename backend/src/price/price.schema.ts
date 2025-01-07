import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Price extends Document {
  @Prop({ required: true })
  priceID: string;

  @Prop({ required: true })
  vehicleID: string;

  @Prop({ required: true })
  rentalPricePerDay: number;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
