import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Moment } from 'moment';
import * as moment from 'moment';
import { ApiProperty } from '@nestjs/swagger';

export class CheckBookingDto {
  @ApiProperty({ type: String })
  @Transform(tryToMoment, { toClassOnly: true })
  @IsNotEmpty()
  start_day: Moment;

  @ApiProperty({ type: String })
  @Transform(tryToMoment, { toClassOnly: true })
  @IsNotEmpty()
  end_day: Moment;
}

export function tryToMoment({ value, key }) {
  if (!isValidTimestamp(value))
    throw new BadRequestException([
      `${key} provided is not in a recognized RFC2822 or ISO format.`,
    ]);

  return moment(value);
}

function isValidTimestamp(_timestamp) {
  const newTimestamp = new Date(_timestamp).getTime();
  return isNumeric(newTimestamp);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
