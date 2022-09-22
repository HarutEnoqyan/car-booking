import { Module } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { TariffRepository } from './tariff.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  exports: [TariffService],
  imports: [DatabaseModule],
  providers: [TariffRepository, TariffService],
})
export class TariffModule {}
