import * as moment from 'moment';
import { Moment } from 'moment';

export class Booking {
  id?: string;
  car_id?: string;
  start_day?: Moment | string;
  end_day?: Moment | string;

  constructor(payload: Booking) {
    this.id = payload?.id;
    this.car_id = payload?.car_id;
    this.start_day = payload?.start_day && moment(payload?.start_day);
    this.end_day = payload?.start_day && moment(payload?.end_day);
  }
}
