import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Inventory } from './inventory.schema';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  async findAll(): Promise<Inventory[]> {
    return this.inventoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Inventory>): Promise<Inventory> {
    return this.inventoryService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Inventory>): Promise<Inventory> {
    return this.inventoryService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Inventory> {
    return this.inventoryService.delete(id);
  }
}
