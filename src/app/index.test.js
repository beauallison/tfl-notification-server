const uuid = require('uuid');
const register = require('./');

describe('app', () => {
  it('should register a user', async () => {
    const req = {
      method: 'POST',
      body: {
        token: `ExpoPushToken[${uuid.v4()}]`,
        stations: ['LONDON'],
      },
    };

    const result = await register(req, {});
    expect(result).toBe('OK');
  });
});
