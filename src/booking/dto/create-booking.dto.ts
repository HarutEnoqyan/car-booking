import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CheckBookingDto } from './check-booking.dto';

export class CreateBookingDto extends CheckBookingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  car_id: string;
}
