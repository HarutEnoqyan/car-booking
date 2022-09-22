import { RepositoryInterface } from '../interfaces/Repository/RepositoryInterface';
import { DatabaseService } from '../database/database.service';
import { Tariff } from './entities/tariff.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TariffRepository implements RepositoryInterface<Tariff> {
  public readonly BASE_PRICE = 1000;

  constructor(private readonly databaseService: DatabaseService) {}

  async all(): Promise<Tariff[]> {
    const response = await this.databaseService.query('SELECT * FROM tariffs');

    return response.rows.map((payload) => new Tariff(payload));
  }

  async find(id: number | string): Promise<Tariff> {
    const { rows } = await this.databaseService.query(
      'SELECT * FROM tariffs WHERE id = $1',
      [id],
    );

    return rows.length ? new Tariff(rows[0]) : undefined;
  }

  async calculatePrice(days: number) {
    const response = await this.databaseService.query(
      'SELECT * FROM tariffs WHERE from_day BETWEEN $1 AND $2',
      [1, days],
    );

    const tariffs = response.rows.map((payload) => new Tariff(payload));

    let price = 0;

    for (let day = 1; day <= days; day++) {
      const tariff = tariffs.find(
        (item) => item.from_day <= day && item.to_day >= day,
      );
      const currentTariffPercentage = tariff ? tariff.percent : 0;

      price +=
        this.BASE_PRICE - (this.BASE_PRICE * currentTariffPercentage) / 100;
    }

    return price;
  }

  async range(): Promise<[number, number]> {
    const minMaxResponse = await this.databaseService.query(
      'SELECT from_day, to_day FROM tariffs WHERE from_day = (SELECT MIN (from_day) FROM tariffs) OR to_day = (SELECT MAX (to_day) FROM tariffs)',
    );

    const min = Math.min(...minMaxResponse.rows.map((el) => el.from_day)) ?? 1;
    const max = Math.max(...minMaxResponse.rows.map((el) => el.to_day)) ?? 29;

    return [min, max + 1];
  }

  async create(payload: Tariff): Promise<Tariff> {
    return undefined;
  }
}
