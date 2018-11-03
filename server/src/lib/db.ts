import Knex from 'knex';
import { PG_URI, PG_POOL_MIN, PG_POOL_MAX } from '../../config';

interface FindAllOptions {
  columns?: Array<string>;
  offset?: number;
  limit?: number;
};

const DEFAULT_FIND_ALL_OPTS: FindAllOptions = {
  offset: 0,
  limit: 100
};

const client: Knex = Knex({
  client: 'pg',
  connection: PG_URI,
  pool: {
    min: PG_POOL_MIN,
    max: PG_POOL_MAX
  },
  searchPath: ['knex', 'public']
});

function find(table: string, criteria: any = {}): Promise<any> {
  return client
    .select()
    .from(table)
    .where(criteria)
    .first()
};

function findAll(
  table: string,
  criteria: any = {},
  opts: FindAllOptions = DEFAULT_FIND_ALL_OPTS): Promise<any> {
  return client
    .select(opts.columns ? opts.columns : '*')
    .from(table)
    .where(criteria)
    .offset(opts.offset)
    .limit(opts.limit);
};

function create(table: string, resource: any, opts: any): Promise<any> {
  const returning = opts.returning || ['id'];
  return client
    .returning(returning)
    .insert(resource)
    .into(table)
};

function update(table: string, criteria: any = {}, attributes: any = {}): Promise<any> {
  return client(table)
    .where(criteria)
    .update(attributes);
};

function remove(table: string, criteria: any = {}): Promise<any> {
  return client(table)
    .where(criteria)
    .del();
};

export { find, findAll, create, update, remove };

export default client;