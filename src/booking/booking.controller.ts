import {
  NotFoundException,
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { CarService } from '../car/car.service';
import { CheckBookingDto, tryToMoment } from './dto/check-booking.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly carService: CarService,
  ) {}

  @Get()
  async findAll() {
    return this.bookingService.findAll();
  }

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    await this.carService.findOrFail(createBookingDto.car_id);

    return this.bookingService.create(createBookingDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const booking = await this.bookingService.findOne(+id);

    if (!booking)
      throw new NotFoundException(`No booking is found by given id #${id}`);

    return booking;
  }

  @Get(':timestamp/statistics')
  async statistics(@Param('timestamp') timestamp: string) {
    const timestampMoment = tryToMoment({ value: timestamp, key: 'timestamp' });

    return this.bookingService.statistics(timestampMoment);
  }

  @Get(':timestamp/statistics/:car')
  async carStatistics(
    @Param('timestamp') timestamp: string,
    @Param('car') car_id: string,
  ) {
    const timestampMoment = tryToMoment({ value: timestamp, key: 'timestamp' });
    const usage = await this.bookingService.getCarStatistics(
      car_id,
      timestampMoment,
    );

    return { usage };
  }

  @Get(':car_id/check')
  async check(
    @Param('car_id') car_id: string,
    @Query() checkBookingDto: CheckBookingDto,
  ) {
    const car = await this.carService.find(car_id);

    return await this.bookingService.check(car, checkBookingDto);
  }
}
