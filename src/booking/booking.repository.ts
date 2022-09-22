import { Injectable } from '@nestjs/common';
import { Booking } from './entities/booking.entity';
import { RepositoryInterface } from '../interfaces/Repository/RepositoryInterface';
import { DatabaseService } from '../database/database.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Car } from '../car/entities/car.entity';

@Injectable()
export class BookingRepository
  implements RepositoryInterface<Booking, CreateBookingDto>
{
  constructor(private readonly databaseService: DatabaseService) {}

  async all(): Promise<Booking[]> {
    const response = await this.databaseService.query('SELECT * FROM bookings');

    return response.rows.map((payload) => new Booking(payload));
  }

  async create(payload: CreateBookingDto): Promise<Booking> {
    const { car_id, start_day, end_day } = payload;

    const { rows } = await this.databaseService.query(
      `INSERT INTO bookings (car_id, start_day, end_day) VALUES ($1, $2, $3) RETURNING *`,
      [car_id, start_day, end_day],
    );

    return new Booking(rows[0]);
  }

  async find(id: number): Promise<Booking> {
    const { rows } = await this.databaseService.query(
      'SELECT * FROM bookings WHERE id = $1',
      [id],
    );

    return rows.length ? new Booking(rows[0]) : undefined;
  }

  async findByCar(
    car: Car,
    start: Moment = moment().startOf('month'),
    end: Moment = moment().endOf('month'),
  ): Promise<Booking[]> {
    const { rows } = await this.databaseService.query(
      `SELECT * FROM bookings WHERE car_id = $1 AND
          (start_day BETWEEN $2 AND $3 OR end_day BETWEEN $2 AND $3)
      `,
      [car.id, start, end],
    );

    return rows.map((payload) => new Booking(payload));
  }
}
