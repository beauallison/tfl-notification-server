const boom = require('boom');
const mongoUriBuilder = require('mongo-uri-builder');
const mongodb = require('mongodb');

module.exports = async (MONGO) => {
  try {
    const connectionString = mongoUriBuilder(MONGO);
    return await mongodb.MongoClient.connect(connectionString);
  } catch (err) {
    throw err.message === 'Authentication failed.' ? boom.unauthorized() : boom.serverUnavailable();
  }
};
