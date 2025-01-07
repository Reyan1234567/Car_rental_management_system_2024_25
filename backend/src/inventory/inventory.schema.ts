import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Inventory extends Document {
  @Prop({ required: true })
  inventoryID: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  description: string;
}

export const InventorySchema = SchemaFactory.createForClass(Inventory);
