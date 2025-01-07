import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { BookingService } from './booking.service';
  import { Booking } from './booking.schema';
  
  @Controller('bookings')
  export class BookingController {
    constructor(private readonly bookingService: BookingService) {}
  
    @Get('/sum')
    async getAllBookings(): Promise<Booking[]> {
      try {
        return await this.bookingService.findAll();
      } catch (err) {
        throw new HttpException('Error fetching records', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get()
    async getBookings(): Promise<Booking[]> {
      try {
        return await this.bookingService.findAll();
      } catch (err) {
        throw new HttpException('Error fetching records', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get(':id')
    async getBookingById(@Param('id') id: string): Promise<Booking> {
      try {
        const booking = await this.bookingService.findById(id);
        if (!booking) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        return booking;
      } catch (err) {
        throw new HttpException('Error fetching record', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Post()
    async createBooking(@Body() createBookingDto: Partial<Booking>): Promise<Booking> {
      try {
        return await this.bookingService.create(createBookingDto);
      } catch (err) {
        throw new HttpException('Error adding record', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Patch(':id')
    async updateBooking(
      @Param('id') id: string,
      @Body() updateBookingDto: Partial<Booking>,
    ): Promise<Booking> {
      try {
        const updatedBooking = await this.bookingService.updateById(id, updateBookingDto);
        if (!updatedBooking) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        return updatedBooking;
      } catch (err) {
        throw new HttpException('Error updating record', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Delete(':id')
    async deleteBooking(@Param('id') id: string): Promise<Booking> {
      try {
        const deletedBooking = await this.bookingService.deleteById(id);
        if (!deletedBooking) throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        return deletedBooking;
      } catch (err) {
        throw new HttpException('Error deleting record', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  