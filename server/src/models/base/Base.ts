import { find, findAll, create, update, remove } from '../../lib/db';

export interface BaseType {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export default class Base {
  constructor() { }

  public static find(table: string, criteria: any): Promise<BaseType> {
    return (async () => find(table, criteria))();
  }

  public static findById(table: string, id: string): Promise<BaseType> {
    return (async () => find(table, { id }))();
  }

  public static findAll(table: string, criteria: any, opts?: any): Promise<BaseType[]> {
    return (async () => findAll(table, criteria, opts))();
  }

  public static create(table: string, resource: any, opts?: any): Promise<BaseType[]> {
    return (async () => create(table, resource, opts))();
  }

  public static update(table: string, criteria: any, attributes: any): Promise<BaseType> {
    return (async () => update(table, criteria, attributes))();
  }

  public static remove(table: string, criteria: any): Promise<BaseType> {
    return (async () => remove(table, criteria))();
  }
}
