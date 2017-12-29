const Collection = require('./');

describe('users', () => {
  let collection;

  describe('register', () => {
    beforeAll(async () => { collection = await new Collection(); });

    it('should register a user', async () => {
      const { result } = await collection.register({
        token: 'ExpoPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
        stations: ['LONDON'],
      });

      expect(result).toEqual({ n: 1, ok: 1 });
    });
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const results = await collection.getAll();
      expect(results.length).toBeGreaterThan(0);
      results.forEach(item => expect(Object.keys(item)).toEqual(['token', 'stations']));
    });
  });
});
