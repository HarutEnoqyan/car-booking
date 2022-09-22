import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingRepository } from './booking.repository';
import { CarService } from '../car/car.service';
import { CheckBookingDto } from './dto/check-booking.dto';
import { Car } from '../car/entities/car.entity';
import { TariffService } from '../tariff/tariff.service';
import { Booking } from './entities/booking.entity';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable()
export class BookingService {
  constructor(
    private readonly bookingRepository: BookingRepository,
    private readonly carService: CarService,
    private readonly tariffService: TariffService,
  ) {}

  public async create(createBookingDto: CreateBookingDto) {
    const { start_day, end_day } = createBookingDto;

    const car = await this.carService.findOrFail(createBookingDto.car_id);
    await this.ifValidFreeTime(car, start_day, end_day);

    return await this.bookingRepository.create(createBookingDto);
  }

  public async check(car: Car, checkBookingDto: CheckBookingDto) {
    const { start_day, end_day } = checkBookingDto;

    await this.ifValidFreeTime(car, start_day, end_day);
    const price = await this.tariffService.calculate(start_day, end_day);

    return { car, price };
  }

  public async findAll(timestamp: Moment = moment()) {
    const startOf = moment(timestamp).startOf('month');
    const endOf = moment(timestamp).endOf('month');
    const cars = await this.carService.all();

    const booking_groups = await Promise.all(
      cars.map((car) => this.bookingRepository.findByCar(car, startOf, endOf)),
    );

    return booking_groups.reduce<Record<string, Booking[]>>(
      (map, bookings, currentIndex) => {
        map[cars[currentIndex].id] = bookings;
        return map;
      },
      {},
    );
  }

  public async findOne(id: number) {
    return await this.bookingRepository.find(id);
  }

  public async statistics(timestamp: Moment = moment()) {
    const mountDuration = moment(timestamp)
      .endOf('month')
      .add(1, 'day')
      .diff(moment(timestamp).startOf('month'), 'day');

    const statistics: Record<string, number> = {};
    const bookingGroups = await this.findAll(timestamp);

    for (const [car_id, bookings] of Object.entries(bookingGroups)) {
      statistics[car_id] = this.getCarUsageByRange(bookings, mountDuration);
    }
    return statistics;
  }

  public async getCarStatistics(
    car_id: string,
    mount: Moment,
  ): Promise<number> {
    const car = await this.carService.findOrFail(car_id);
    const bookings = await this.bookingRepository.findByCar(
      car,
      moment(mount).startOf('month'),
      moment(mount).endOf('month'),
    );
    const mountDuration = moment(mount)
      .endOf('month')
      .add(1, 'day')
      .diff(moment(mount).startOf('month'), 'day');

    return this.getCarUsageByRange(bookings, mountDuration);
  }

  public getCarUsageByRange(
    bookings: Booking[],
    mountDuration: number,
  ): number {
    return bookings.reduce<number>((usage, booking) => {
      const duration = moment(booking.end_day)
        .add(1, 'day')
        .diff(moment(booking.start_day), 'day');

      usage += (100 / mountDuration) * duration;

      return usage;
    }, 0);
  }

  private async ifValidFreeTime(car: Car, start_day: Moment, end_day: Moment) {
    const [min, max] = await this.tariffService.range();
    const diff = moment(end_day).diff(start_day, 'day');

    if (diff < min || diff > max)
      throw new BadRequestException([`invalid date range`]);

    if ([0, 6].includes(start_day.day()))
      throw new BadRequestException(['booking in weekend_day is not allowed']);

    const bookings = await this.bookingRepository.findByCar(
      car,
      moment(start_day).add(-3, 'day'),
      moment(end_day).add(3, 'day'),
    );

    if (bookings.length)
      throw new ForbiddenException(
        `No Free time is available for #${car.id} in given dates`,
      );
  }
}
