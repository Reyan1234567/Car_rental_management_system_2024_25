import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Param,
    Body,
    UseGuards,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { BookingService } from '../services/booking.service';
  import { JwtAuthGuard } from '../middlewares/authenticateToken.middleware';
  import { RolesGuard } from '../middlewares/authorizeRole.middleware';
  import { Roles } from '../middlewares/roles.decorator';
  
  @Controller('booking')
  export class BookingController {
    constructor(private readonly bookingService: BookingService) {}
  
    @Get()
    async getAllBookings() {
      try {
        return await this.bookingService.findAll();
      } catch (error) {
        throw new HttpException('Error fetching records', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Get(':id')
    async getBookingById(@Param('id') id: string) {
      try {
        const booking = await this.bookingService.findById(id);
        if (!booking) {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return booking;
      } catch (error) {
        throw new HttpException('Error fetching record', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Post()
    async createBooking(@Body() bookingData: any) {
      try {
        return await this.bookingService.create(bookingData);
      } catch (error) {
        throw new HttpException('Error adding record', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Patch(':id')
    async updateBooking(@Param('id') id: string, @Body() updates: any) {
      try {
        const updatedBooking = await this.bookingService.update(id, updates);
        if (!updatedBooking) {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return updatedBooking;
      } catch (error) {
        throw new HttpException('Error updating record', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  
    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user')
    async deleteBooking(@Param('id') id: string) {
      try {
        const deletedBooking = await this.bookingService.delete(id);
        if (!deletedBooking) {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return deletedBooking;
      } catch (error) {
        throw new HttpException('Error deleting record', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  