import { Injectable } from '@nestjs/common';
import { Tariff } from './entities/tariff.model';
import { ReadableInterface } from '../interfaces/Repository/ReadableInterface';
import { TariffRepository } from './tariff.repository';
import * as moment from 'moment';
import { Moment } from 'moment';

@Injectable()
export class TariffService implements ReadableInterface<Tariff> {
  constructor(private readonly tariffRepository: TariffRepository) {}

  async all(): Promise<Tariff[]> {
    return await this.tariffRepository.all();
  }

  async find(id: number | string): Promise<Tariff> {
    return await this.tariffRepository.find(id);
  }

  async calculate(from: Moment, to: Moment): Promise<number> {
    // added one day in order to include the current day
    const days = moment(to).add(1, 'days').diff(from, 'days');

    return await this.tariffRepository.calculatePrice(days);
  }

  async range() {
    return await this.tariffRepository.range();
  }
}
