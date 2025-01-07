import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './employee.schema';

@Injectable()
export class EmployeeService {
  constructor(@InjectModel(Employee.name) private employeeModel: Model<Employee>) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeModel.findById(id).exec();
    if (!employee) throw new NotFoundException('Employee not found');
    return employee;
  }

  async create(data: Partial<Employee>): Promise<Employee> {
    const { userID, ...employeeData } = data;

    const existingEmployee = await this.employeeModel.findOne({ userID }).exec();
    if (existingEmployee) throw new ConflictException('Employee with this userID already exists');

    const newEmployee = new this.employeeModel({ userID, ...employeeData });
    return newEmployee.save();
  }

  async update(id: string, updates: Partial<Employee>): Promise<Employee> {
    const updatedEmployee = await this.employeeModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    if (!updatedEmployee) throw new NotFoundException('Employee not found');
    return updatedEmployee;
  }

  async delete(id: string): Promise<Employee> {
    const deletedEmployee = await this.employeeModel.findByIdAndDelete(id).exec();
    if (!deletedEmployee) throw new NotFoundException('Employee not found');
    return deletedEmployee;
  }
}
