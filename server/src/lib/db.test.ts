import db, { find, findAll, create, update, remove } from './db';

describe('db module', () => {
  const FAKE_TABLE = 'fake-table';

  it('should be defined and export a module', () => {
    expect(db).toBeDefined();
  });

  it('should export a knex function by default', () => {
    expect(typeof db).toBe('function');
    expect(db.name).toBe('knex');
  });

  describe('find function', () => {
    it('should be defined', () => {
      expect(find).toBeDefined();
    });

    it('should return a Knex Builder object', () => {
      const result = find(FAKE_TABLE);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('findAll function', () => {
    it('should be defined', () => {
      expect(findAll).toBeDefined();
    });

    it('should return a Knex Builder object', () => {
      const result = findAll(FAKE_TABLE);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('create function', () => {
    it('should be defined', () => {
      expect(create).toBeDefined();
    });

    it('should return a Knex Builder object', () => {
      const result = create(FAKE_TABLE, {}, {});
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('update function', () => {
    it('should be defined', () => {
      expect(update).toBeDefined();
    });

    it('should return a Knex Builder object', () => {
      const result = update(FAKE_TABLE);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });

  describe('remove function', () => {
    it('should be defined', () => {
      expect(remove).toBeDefined();
    });

    it('should return a promise', () => {
      const result = remove(FAKE_TABLE);
      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
    });
  });
});
