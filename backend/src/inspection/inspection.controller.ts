import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { InspectionService } from './inspection.service';
import { Inspection } from './inspection.schema';

@Controller('inspections')
export class InspectionController {
  constructor(private readonly inspectionService: InspectionService) {}

  @Get()
  async findAll(): Promise<Inspection[]> {
    return this.inspectionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Inspection> {
    return this.inspectionService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Inspection>): Promise<Inspection> {
    return this.inspectionService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Inspection>): Promise<Inspection> {
    return this.inspectionService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Inspection> {
    return this.inspectionService.delete(id);
  }
}
