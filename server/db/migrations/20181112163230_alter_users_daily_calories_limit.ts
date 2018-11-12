import { USERS_TABLE } from '../constants';

export const up = (knex) => {
  return knex.raw(`
    ALTER TABLE ONLY ${USERS_TABLE}
      ALTER COLUMN daily_calories_limit SET DEFAULT 2250;
  `);
};

export const down = (knex) => {
  return knex.raw(`
    ALTER TABLE ONLY ${USERS_TABLE}
      ALTER COLUMN daily_calories_limit SET DEFAULT 0;
  `);
};
