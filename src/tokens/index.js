const Expo = require('expo-server-sdk');
const { MONGO } = require('config');
const client = require('./client');

module.exports = async () => {
  const Client = await client(MONGO.auth);
  const tokens = Client.db(MONGO.tokens.database);

  return {
    register: ({ token, stations }) =>
      tokens.collection(MONGO.tokens.collection).insertOne({ token, stations }),
    getAll: async () => {
      const clients = await tokens.collection(MONGO.tokens.collection).find({}).toArray();

      return clients
        .map(({ token, stations }) => ({ token, stations }))
        .filter(({ token }) => Expo.isExpoPushToken(token));
    },
  };
};

