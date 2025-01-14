import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from './driver.schema';

@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>) {}



  async findAll(): Promise<Driver[]> {
    return this.driverModel.find().exec();
  }
  /**
   * Retrieve a single driver by ID
   * @param id - The ID of the driver to find
   * @returns Promise containing the found Driver document
   * @throws NotFoundException if no driver with the given ID exists
   */

  async findOne(id: string): Promise<Driver> {
    const driver = await this.driverModel.findById(id).exec();
    if (!driver) throw new NotFoundException('Driver not found');
    return driver;
  }

  async create(data: Partial<Driver>): Promise<Driver> {
    const newDriver = new this.driverModel(data);
    return newDriver.save();
  }
   /**
   * Update an existing driver's information
   * @param id - The ID of the driver to update
   * @param updates - Partial updates to apply to the driver
   * @returns Promise containing the updated Driver document
   * @throws NotFoundException if no driver with the given ID exists
   */

  async update(id: string, updates: Partial<Driver>): Promise<Driver> {
    const updatedDriver = await this.driverModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    if (!updatedDriver) throw new NotFoundException('Driver not found');
    return updatedDriver;
  }
   /**
   * Delete a driver by ID
   * @param id - The ID of the driver to delete
   * @returns Promise containing the deleted Driver document
   * @throws NotFoundException if no driver with the given ID exists
   */

  async delete(id: string): Promise<Driver> {
    const deletedDriver = await this.driverModel.findByIdAndDelete(id).exec();
    if (!deletedDriver) throw new NotFoundException('Driver not found');
    return deletedDriver;
  }
}
