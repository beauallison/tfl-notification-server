const boom = require('boom');
const mongoUriBuilder = require('mongo-uri-builder');
const mongodb = require('mongodb');

module.exports = async (MONGO) => {
  try {
    const connectionString = mongoUriBuilder(MONGO);
    return await mongodb.MongoClient.connect(connectionString);
  } catch (err) {
    if (err.message === 'Authentication failed.') {
      throw boom.unauthorized();
    } else {
      throw boom.serverUnavailable();
    }
  }
};
