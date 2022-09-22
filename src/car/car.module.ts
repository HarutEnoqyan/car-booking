import { Module } from '@nestjs/common';
import { CarService } from './car.service';

@Module({
  exports: [CarService],
  providers: [CarService],
})
export class CarModule {}
