import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.schema';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Employee>): Promise<Employee> {
    return this.employeeService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Employee>): Promise<Employee> {
    return this.employeeService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Employee> {
    return this.employeeService.delete(id);
  }
}
