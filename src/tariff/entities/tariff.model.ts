export class Tariff {
  id?: number;
  percent?: number;
  to_day?: number;
  from_day?: number;

  constructor(tariff: Tariff) {
    this.id = tariff.id;
    this.percent = tariff.percent;
    this.to_day = tariff.to_day;
    this.from_day = tariff.from_day;
  }

  get getDifferenceDays() {
    return this.to_day - (this.from_day - 1);
  }
}
