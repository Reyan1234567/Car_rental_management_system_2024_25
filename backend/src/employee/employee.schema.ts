import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * Represents an Employee entity in the database.
 * Each employee has a unique identifier, personal details, and a status.
 */

@Schema() // Marks this class as a schema for MongoDB
export class Employee extends Document {
  @Prop({ required: true, unique: true })
  userID: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  email: string;
  /**
   * Current status of the employee (e.g., Active, Inactive).
   * This field is required.
   */

  @Prop({ required: true })
  status: string;
}
/**
 * Schema definition for the Employee class.
 * Used to create and manage Employee documents in the database.
 */

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
