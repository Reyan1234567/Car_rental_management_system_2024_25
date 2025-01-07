import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehicle } from './vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(@InjectModel(Vehicle.name) private vehicleModel: Model<Vehicle>) {}

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async findOne(id: string): Promise<Vehicle> {
    const vehicle = await this.vehicleModel.findById(id).exec();
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async getVehicleCount(): Promise<number> {
    return this.vehicleModel.countDocuments().exec();
  }

  async create(data: Partial<Vehicle>): Promise<Vehicle> {
    const newVehicle = new this.vehicleModel(data);
    return newVehicle.save();
  }

  async update(id: string, updates: Partial<Vehicle>): Promise<Vehicle> {
    const updatedVehicle = await this.vehicleModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
    if (!updatedVehicle) throw new NotFoundException('Vehicle not found');
    return updatedVehicle;
  }

  async delete(id: string): Promise<Vehicle> {
    const deletedVehicle = await this.vehicleModel.findByIdAndDelete(id).exec();
    if (!deletedVehicle) throw new NotFoundException('Vehicle not found');
    return deletedVehicle;
  }
}
