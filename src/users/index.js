const boom = require('boom');
const Expo = require('expo-server-sdk');
const { mongo } = require('config');
const client = require('./client');

const isValidToken = token => Expo.isExpoPushToken(token);

module.exports = class Users {
  constructor() {
    return (async () => {
      const Client = await client(mongo.auth);
      this.tokens = Client.db(mongo.tokens.database);
      return this;
    })();
  }

  async exists(token) {
    const exists = await this.tokens
      .collection(mongo.tokens.collection)
      .findOne({ token });

    return exists !== null;
  }

  async manage(opts) {
    const { token, stations } = opts;

    if (!isValidToken(token)) throw boom.badData('Invalid Expo token');
    const exists = await this.exists(token);

    if (stations) return exists ? this.update(opts) : this.register(opts);
    if (exists) return this.unregister(opts);

    throw boom.unauthorized('Token not found');
  }

  update({ token, stations }) {
    return this.tokens
      .collection(mongo.tokens.collection)
      .updateOne({ token }, { $set: { stations } });
  }

  register({ token, stations }) {
    return this.tokens
      .collection(mongo.tokens.collection)
      .insertOne({ token, stations })
      .then(({ result }) => result);
  }

  unregister({ token }) {
    return this.tokens
      .collection(mongo.tokens.collection)
      .deleteMany({ token })
      .then(({ result }) => result);
  }

  getAll() {
    return this.tokens
      .collection(mongo.tokens.collection)
      .find({})
      .toArray()
      .then(users => users
        .map(({ token, stations }) => ({ token, stations }))
        .filter(({ token }) => isValidToken(token)));
  }
};
