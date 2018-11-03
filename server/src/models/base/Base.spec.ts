import Base from './Base';

describe('Base model', () => {
  const FAKE_TABLE = 'fake_table';

  it('should export a module', () => {
    expect(Base).toBeDefined();
  });

  describe('static method "find"', () => {
    it('should exist', () => {
      expect(Base.find).toBeDefined();
    });
  });

  describe('static method "findById"', () => {
    it('should exist', () => {
      expect(Base.findById).toBeDefined();
    });
  });

  describe('static method "findAll"', () => {
    it('should exist', () => {
      expect(Base.findAll).toBeDefined();
    });
  });

  describe('static method "create"', () => {
    it('should exist', () => {
      expect(Base.create).toBeDefined();
    });
  });

  describe('static method "update"', () => {
    it('should exist', () => {
      expect(Base.update).toBeDefined();
    });
  });

  describe('static method "remove"', () => {
    it('should exist', () => {
      expect(Base.remove).toBeDefined();
    });
  });
});
