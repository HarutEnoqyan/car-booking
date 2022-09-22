import { Global, Module } from '@nestjs/common';

import {
  CONNECTION_POOL,
  DATABASE_OPTIONS,
} from './database.module-definition';
import { DatabaseService } from './database.service';
import { Pool } from 'pg';

@Global()
@Module({
  exports: [DatabaseService],
  providers: [
    DatabaseService,
    {
      provide: CONNECTION_POOL,
      useFactory: () => new Pool(DATABASE_OPTIONS),
    },
  ],
})
export class DatabaseModule {}
