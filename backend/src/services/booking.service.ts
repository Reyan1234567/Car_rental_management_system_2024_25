import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from '../models/booking.schema';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

  async findAll() {
    return this.bookingModel.find().exec();
  }

  async findById(id: string) {
    return this.bookingModel.findById(id).exec();
  }

  async create(data: any) {
    const newBooking = new this.bookingModel(data);
    return newBooking.save();
  }

  async update(id: string, updates: any) {
    return this.bookingModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async delete(id: string) {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }
}
