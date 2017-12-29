const Expo = require('expo-server-sdk');
const { MONGO } = require('config');
const client = require('./client');

module.exports = class Users {
  constructor() {
    return (async () => {
      const Client = await client(MONGO.auth);
      this.tokens = Client.db(MONGO.tokens.database);
      return this;
    })();
  }

  register({ token, stations }) {
    if (!Expo.isExpoPushToken(token)) {
      throw new Error('Invalid Expo token');
    }

    return this.tokens
      .collection(MONGO.tokens.collection)
      .insertOne({ token, stations });
  }

  getAll() {
    return this.tokens
      .collection(MONGO.tokens.collection)
      .find({})
      .toArray()
      .then(users => users
        .map(({ token, stations }) => ({ token, stations }))
        .filter(({ token }) => Expo.isExpoPushToken(token)));
  }
};
