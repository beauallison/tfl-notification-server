const { MONGO } = require('config');
const Client = require('./');

describe('tokens/client', () => {
  it('should connect to mongodb', async () => {
    const client = await Client(MONGO.auth);
    const db = client.db(MONGO.auth.database);
    expect(db.databaseName).toEqual(MONGO.auth.database);
  });
});
