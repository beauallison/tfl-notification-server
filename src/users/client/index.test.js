const { mongo } = require('config');
const Client = require('./');

describe('tokens/client', () => {
  it('should connect to mongodb', async () => {
    const client = await Client(mongo.auth);
    const db = client.db(mongo.auth.database);
    expect(db.databaseName).toEqual(mongo.auth.database);
  });

  it('should throw an error on unavailable service', () => {
    const auth = { ...mongo.auth, password: 'wrong' };
    return expect(Client(auth)).rejects.toThrow('Unauthorized');
  });

  it('should throw an error on unavailable service', () => {
    const auth = { ...mongo.auth, port: mongo.auth.port += 1 };
    return expect(Client(auth)).rejects.toThrow('Service Unavailable');
  });
});
