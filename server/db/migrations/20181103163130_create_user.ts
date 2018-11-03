import { USERS_TABLE } from '../constants';

export const up = (knex) => {
  return knex.raw(`
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE ${USERS_TABLE} (
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4() UNIQUE,
      role varchar(50),
      password text NOT NULL,
      name varchar(200) NOT NULL,
      email varchar(100) NOT NULL,
      provider varchar(50) DEFAULT 'local',
      daily_calories_limit integer DEFAULT 0,
      deleted boolean DEFAULT false,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  );
  `);
};

export const down = (knex) => {
  return knex.raw(`
    DROP TABLE ${USERS_TABLE} CASCADE;
  `);
};
