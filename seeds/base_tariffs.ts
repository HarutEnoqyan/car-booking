import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('tariffs').del();

  await knex('tariffs').insert([
    { id: 1, from_day: 1, to_day: 4, percent: 0 },
    { id: 2, from_day: 5, to_day: 9, percent: 5 },
    { id: 3, from_day: 10, to_day: 17, percent: 10 },
    { id: 4, from_day: 18, to_day: 29, percent: 15 },
  ]);
}
