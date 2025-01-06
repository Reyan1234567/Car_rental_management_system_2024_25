import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingController } from './controllers/booking.controller';
import { BookingService } from './services/booking.service';
import { Booking, BookingSchema } from './models/booking.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/'),
    MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class AppModule {}
