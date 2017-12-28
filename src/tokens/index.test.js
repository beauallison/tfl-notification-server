const collection = require('./');

describe('tokens', () => {
  let tokens;

  beforeEach(async () => { tokens = await collection(); });

  describe('register', () => {
    it('should register a user', async () => {
      const { result } = await tokens.register({
        token: 'ExpoPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
        stations: ['LONDON'],
      });

      expect(result).toEqual({ n: 1, ok: 1 });
    });
  });

  describe('getAll', () => {
    it('should return all tokens', async () => {
      const results = await tokens.getAll();
      expect(results.length).toBeGreaterThan(1);
      results.forEach(item => expect(Object.keys(item)).toEqual(['token', 'stations']));
    });
  });
});
