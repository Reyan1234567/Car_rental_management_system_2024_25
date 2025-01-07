import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeboundController } from './timebound.controller';
import { TimeboundService } from './timebound.service';
import { Timebound, TimeboundSchema } from './timebound.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Timebound.name, schema: TimeboundSchema }]),
  ],
  controllers: [TimeboundController],
  providers: [TimeboundService],
})
export class TimeboundModule {}
