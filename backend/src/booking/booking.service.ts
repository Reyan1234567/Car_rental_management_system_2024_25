import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './booking.schema';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking.name) private bookingModel: Model<Booking>) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findById(id: string): Promise<Booking> {
    return this.bookingModel.findById(id).exec();
  }

  async create(createBookingDto: Partial<Booking>): Promise<Booking> {
    const newBooking = new this.bookingModel(createBookingDto);
    return newBooking.save();
  }

  async updateById(id: string, updateBookingDto: Partial<Booking>): Promise<Booking> {
    return this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
  }

  async deleteById(id: string): Promise<Booking> {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }
}
