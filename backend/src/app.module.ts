import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingModule } from './booking/booking.module';
import { DriverModule } from './driver/driver.module';
import { InspectionModule } from './inspection/inspection.module';
import { InventoryModule } from './inventory/inventory.module';
import { TimeboundModule } from './timebound/timebound.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { EmployeeModule } from './employee/employee.module';
import { PriceModule } from './price/price.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
      MongooseModule.forRoot("mongodb://localhost:27017/Polo", {
      }), BookingModule, DriverModule, InspectionModule, InventoryModule, TimeboundModule, VehicleModule, EmployeeModule, PriceModule, AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
