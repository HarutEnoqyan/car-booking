import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { DatabaseModule } from '../database/database.module';
import { BookingRepository } from './booking.repository';
import { CarModule } from '../car/car.module';
import { TariffModule } from '../tariff/tariff.module';

@Module({
  imports: [DatabaseModule, CarModule, TariffModule],
  controllers: [BookingController],
  providers: [BookingService, BookingRepository],
})
export class BookingModule {}
