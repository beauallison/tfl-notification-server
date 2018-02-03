const uuid = require('uuid');
const Collection = require('./');

describe('users', () => {
  let collection;
  const newToken = () => `ExpoPushToken[${uuid.v4()}]`;
  const token = newToken();

  beforeAll(async () => { collection = await new Collection(); });

  describe('register', () => {
    it('should register a user', async () => {
      const registered = await collection.register({
        token,
        stations: ['LONDON'],
      });

      expect(registered).toEqual({ n: 1, ok: 1 });
    });
  });

  describe('exists', () => {
    it('should return id for exiting user', async () => {
      const exists = await collection.exists(token);
      expect(exists).toBeTruthy();
    });

    it('should return false on non-matching token', async () => {
      const exists = await collection.exists(`ExpoPushToken[${uuid.v4()}]`);
      expect(exists).toBeFalsy();
    });
  });

  describe('unregister', () => {
    it('should unregister a user', async () => {
      const opts = {
        token: newToken(),
        stations: ['LONDON'],
      };

      await collection.register(opts);
      const unregistered = await collection.unregister(opts);
      expect(unregistered).toEqual({ n: 1, ok: 1 });
    });
  });

  describe('manage', () => {
    it('should route functions correctly', async () => {
      const opts = { token: newToken(), stations: ['LONDON'] };

      const actions = [
        { action: 'register', ...opts },
        { action: 'update', ...opts },
        { action: 'unregister', token: opts.token },
      ];

      await actions.reduce(async (previous, { action, ...args }) => {
        await previous;
        const spy = jest.spyOn(collection, action);
        await collection.manage(args);
        expect(spy).toHaveBeenCalled();
        expect(spy).toBeCalledWith(args);
      }, Promise.resolve());
    });

    it('should throw an error on nonexistent token', async () =>
      expect(collection.manage({ token: newToken() }))
        .rejects.toThrow('Token not found'));

    it('should throw an error on invalid token', async () =>
      expect(collection.manage({ token: 12345 }))
        .rejects.toThrow('Invalid Expo token'));
  });

  describe('getAll', () => {
    it('should return all users', async () => {
      const results = await collection.getAll();
      expect(results.length).toBeGreaterThan(0);
      results.forEach(item => expect(Object.keys(item)).toEqual(['token', 'stations']));
    });
  });
});
