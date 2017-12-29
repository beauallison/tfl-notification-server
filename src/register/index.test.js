const register = require('./');

describe('register', () => {
  it('should register a user', async () => {
    const req = {
      method: 'POST',
      body: {
        token: 'ExpoPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
        stations: ['LONDON'],
      },
    };

    const result = await register(req, {});
    expect(result).toBe('OK');
  });
});
