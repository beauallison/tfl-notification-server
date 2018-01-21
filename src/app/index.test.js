const uuid = require('uuid');
const app = require('./');

describe('app', () => {
  it('should register a user', async () => {
    const req = {
      method: 'POST',
      body: {
        token: `ExpoPushToken[${uuid.v4()}]`,
        stations: ['LONDON'],
      },
    };

    const response = await app(req, {});
    expect(response).toBe('OK');
  });

  it('should return an error on invalid HTTP method', async () => {
    const response = await app({ req: { method: 'GET' } });
    expect(response).toEqual({ statusCode: 403, message: 'Forbidden' });
  });
});
