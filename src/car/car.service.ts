import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './entities/car.entity';
import { ReadableInterface } from '../interfaces/Repository/ReadableInterface';

@Injectable()
export class CarService implements ReadableInterface<Car> {
  private cars: Car[] = [
    new Car({ id: 'car_1' }),
    new Car({ id: 'car_2' }),
    new Car({ id: 'car_3' }),
    new Car({ id: 'car_4' }),
    new Car({ id: 'car_5' }),
  ];

  async all(): Promise<Car[]> {
    return this.cars;
  }

  async find(id: string): Promise<Car> {
    return this.cars.find((car) => car.id == id);
  }

  async findOrFail(id: string): Promise<Car> {
    const car = await this.find(id);

    if (!car) throw new NotFoundException(`No car is found by given id #${id}`);

    return car;
  }
}
