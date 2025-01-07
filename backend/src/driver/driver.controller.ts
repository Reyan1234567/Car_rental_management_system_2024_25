import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { DriverService } from './driver.service';
import { Driver } from './driver.schema';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  async findAll(): Promise<Driver[]> {
    return this.driverService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Driver> {
    return this.driverService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Driver>): Promise<Driver> {
    return this.driverService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Driver>): Promise<Driver> {
    return this.driverService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Driver> {
    return this.driverService.delete(id);
  }
}
