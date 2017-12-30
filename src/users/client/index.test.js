const { mongo } = require('config');
const Client = require('./');

describe('tokens/client', () => {
  it('should connect to mongodb', async () => {
    const client = await Client(mongo.auth);
    const db = client.db(mongo.auth.database);
    expect(db.databaseName).toEqual(mongo.auth.database);
  });
});
