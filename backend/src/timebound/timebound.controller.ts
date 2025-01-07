import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TimeboundService } from './timebound.service';
import { Timebound } from './timebound.schema';

@Controller('timebounds')
export class TimeboundController {
  constructor(private readonly timeboundService: TimeboundService) {}

  @Get()
  async findAll(): Promise<Timebound[]> {
    return this.timeboundService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Timebound> {
    return this.timeboundService.findOne(id);
  }

  @Post()
  async create(@Body() data: Partial<Timebound>): Promise<Timebound> {
    return this.timeboundService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updates: Partial<Timebound>): Promise<Timebound> {
    return this.timeboundService.update(id, updates);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Timebound> {
    return this.timeboundService.delete(id);
  }
}
