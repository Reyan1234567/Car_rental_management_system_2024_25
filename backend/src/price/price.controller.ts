import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { PriceService } from './price.service';
import { Price } from './price.schema';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  async findAll(): Promise<Price[]> {
    return this.priceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Price> {
    return this.priceService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Price>): Promise<Price> {
    return this.priceService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Price>): Promise<Price> {
    return this.priceService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Price> {
    return this.priceService.delete(id);
  }
}
