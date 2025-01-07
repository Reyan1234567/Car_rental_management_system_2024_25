import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Price } from './price.schema';

@Injectable()
export class PriceService {
  constructor(@InjectModel(Price.name) private priceModel: Model<Price>) {}

  async findAll(): Promise<Price[]> {
    return this.priceModel.find().exec();
  }

  async findOne(id: string): Promise<Price> {
    const price = await this.priceModel.findById(id).exec();
    if (!price) throw new NotFoundException('Price not found');
    return price;
  }

  async create(data: Partial<Price>): Promise<Price> {
    const newPrice = new this.priceModel(data);
    return newPrice.save();
  }

  async update(id: string, updates: Partial<Price>): Promise<Price> {
    const updatedPrice = await this.priceModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
    if (!updatedPrice) throw new NotFoundException('Price not found');
    return updatedPrice;
  }

  async delete(id: string): Promise<Price> {
    const deletedPrice = await this.priceModel.findByIdAndDelete(id).exec();
    if (!deletedPrice) throw new NotFoundException('Price not found');
    return deletedPrice;
  }
}
