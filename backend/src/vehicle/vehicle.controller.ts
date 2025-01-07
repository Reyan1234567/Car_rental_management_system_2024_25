import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { Vehicle } from './vehicle.schema';

@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Get()
  async findAll(): Promise<Vehicle[]> {
    return this.vehicleService.findAll();
  }

  @Get('/num')
  async getVehicleCount(): Promise<number> {
    return this.vehicleService.getVehicleCount();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vehicle> {
    return this.vehicleService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Vehicle>): Promise<Vehicle> {
    return this.vehicleService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Vehicle>): Promise<Vehicle> {
    return this.vehicleService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Vehicle> {
    return this.vehicleService.delete(id);
  }
}
