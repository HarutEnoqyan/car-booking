import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE bookings (
      id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      car_id varchar NOT NULL,
      start_day TIMESTAMP  NOT NULL,
      end_day TIMESTAMP  NOT NULL
    )
  `);
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TABLE bookings
  `);
}
