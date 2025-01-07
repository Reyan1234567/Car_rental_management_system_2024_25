import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inventory } from './inventory.schema';

@Injectable()
export class InventoryService {
  constructor(@InjectModel(Inventory.name) private inventoryModel: Model<Inventory>) {}

  async findAll(): Promise<Inventory[]> {
    return this.inventoryModel.find().exec();
  }

  async findOne(id: string): Promise<Inventory> {
    const inventoryItem = await this.inventoryModel.findById(id).exec();
    if (!inventoryItem) throw new NotFoundException('Inventory item not found');
    return inventoryItem;
  }

  async create(data: Partial<Inventory>): Promise<Inventory> {
    const newInventoryItem = new this.inventoryModel(data);
    return newInventoryItem.save();
  }

  async update(id: string, updates: Partial<Inventory>): Promise<Inventory> {
    const updatedInventoryItem = await this.inventoryModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
    if (!updatedInventoryItem) throw new NotFoundException('Inventory item not found');
    return updatedInventoryItem;
  }

  async delete(id: string): Promise<Inventory> {
    const deletedInventoryItem = await this.inventoryModel.findByIdAndDelete(id).exec();
    if (!deletedInventoryItem) throw new NotFoundException('Inventory item not found');
    return deletedInventoryItem;
  }
}
