import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Timebound } from './timebound.schema';

@Injectable()
export class TimeboundService {
  constructor(@InjectModel(Timebound.name) private timeboundModel: Model<Timebound>) {}

  async findAll(): Promise<Timebound[]> {
    return this.timeboundModel.find().exec();
  }

  async findOne(id: string): Promise<Timebound> {
    const timebound = await this.timeboundModel.findById(id).exec();
    if (!timebound) throw new NotFoundException('Timebound not found');
    return timebound;
  }

  async create(data: Partial<Timebound>): Promise<Timebound> {
    const newTimebound = new this.timeboundModel(data);
    return newTimebound.save();
  }

  async update(id: string, updates: Partial<Timebound>): Promise<Timebound> {
    const updatedTimebound = await this.timeboundModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
    if (!updatedTimebound) throw new NotFoundException('Timebound not found');
    return updatedTimebound;
  }

  async delete(id: string): Promise<Timebound> {
    const deletedTimebound = await this.timeboundModel.findByIdAndDelete(id).exec();
    if (!deletedTimebound) throw new NotFoundException('Timebound not found');
    return deletedTimebound;
  }
}
