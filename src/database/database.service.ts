import { CONNECTION_POOL } from './database.module-definition';
import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {}

  async query(query: string, params?: unknown[]) {
    return await this.pool.query(query, params);
  }
}
