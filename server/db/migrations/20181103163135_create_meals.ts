import { MEALS_TABLE, USERS_TABLE } from '../constants';

export const up = (knex) => {
  return knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE ${MEALS_TABLE} (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4() UNIQUE,
      user_id uuid NOT NULL REFERENCES ${USERS_TABLE}(id),
      text text NOT NULL,
      date varchar(50),
      time TIME NOT NULL DEFAULT NOW(),
      number_of_calories integer,
      deleted boolean DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  );
  `);
};

export const down = (knex) => {
  return knex.raw(`
    DROP TABLE ${MEALS_TABLE} CASCADE;
  `);
};
