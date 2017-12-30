const boom = require('boom');
const Expo = require('expo-server-sdk');
const { mongo } = require('config');
const client = require('./client');

module.exports = class Users {
  constructor() {
    return (async () => {
      const Client = await client(mongo.auth);
      this.tokens = Client.db(mongo.tokens.database);
      return this;
    })();
  }

  register({ token, stations }) {
    if (!Expo.isExpoPushToken(token)) {
      throw boom.badData('Invalid Expo token');
    }

    return this.tokens
      .collection(mongo.tokens.collection)
      .insertOne({ token, stations });
  }

  getAll() {
    return this.tokens
      .collection(mongo.tokens.collection)
      .find({})
      .toArray()
      .then(users => users
        .map(({ token, stations }) => ({ token, stations }))
        .filter(({ token }) => Expo.isExpoPushToken(token)));
  }
};
