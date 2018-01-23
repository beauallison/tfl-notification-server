const _ = require('lodash');
const Expo = require('expo-server-sdk');
const Collection = require('../../users');
const { LINES } = require('../../../constants');

const expo = new Expo();
const currentStation = _.cloneDeep(LINES);

module.exports = async () => {
  const users = await new Collection();
  const tokens = await users.getAll();

  const messages = tokens.map(({ token, stations }) =>
    stations.map(ID => ({
      to: token,
      sound: 'default',
      body: currentStation[ID],
      data: {},
    })));

  const chunks = expo.chunkPushNotifications(messages);
  await Promise.all(chunks.map(chunk =>
    expo.sendPushNotificationsAsync(chunk)));
};
