import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { Price, PriceSchema } from './price.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Price.name, schema: PriceSchema }]),
  ],
  controllers: [PriceController],
  providers: [PriceService],
})
export class PriceModule {}
