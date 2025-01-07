import mongoose, { Document } from 'mongoose';

export interface Authentication extends Document {
  userID: string;
  password: string;
  role: 'user' | 'admin';
}

const authenticationSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});

export { authenticationSchema };