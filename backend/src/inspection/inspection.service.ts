import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Inspection } from './inspection.schema';

@Injectable()
export class InspectionService {
  constructor(@InjectModel(Inspection.name) private inspectionModel: Model<Inspection>) {}

  async findAll(): Promise<Inspection[]> {
    return this.inspectionModel.find().exec();
  }

  async findOne(id: string): Promise<Inspection> {
    const inspection = await this.inspectionModel.findById(id).exec();
    if (!inspection) throw new NotFoundException('Inspection not found');
    return inspection;
  }

  async create(data: Partial<Inspection>): Promise<Inspection> {
    const newInspection = new this.inspectionModel(data);
    return newInspection.save();
  }

  async update(id: string, updates: Partial<Inspection>): Promise<Inspection> {
    const updatedInspection = await this.inspectionModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
    if (!updatedInspection) throw new NotFoundException('Inspection not found');
    return updatedInspection;
  }

  async delete(id: string): Promise<Inspection> {
    const deletedInspection = await this.inspectionModel.findByIdAndDelete(id).exec();
    if (!deletedInspection) throw new NotFoundException('Inspection not found');
    return deletedInspection;
  }
}
