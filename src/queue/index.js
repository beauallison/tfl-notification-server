const _ = require('lodash');
const Queue = require('bull');
const Expo = require('expo-server-sdk');
const { REDIS } = require('config');
const getStatus = require('../getStatus');
const { LINES } = require('../../constants');

const TIMER = { cron: '* * * * *' };

const expo = new Expo();
const currentStation = _.cloneDeep(LINES);

module.exports = () => ({
  stations: () => {
    const queue = new Queue('stationsStatusQueue', REDIS);

    queue.process(() =>
      Promise.all(_.map(currentStation, async ({ station }, ID) => {
        const { status } = await getStatus(station);
        currentStation[ID].status = status;
      })));

    queue.add({}, TIMER);
    return queue;
  },
  notifications: () => {
    const queue = new Queue('notificationsQueue', REDIS);

    queue.process(async () => {
      let clients = await Promise.resolve(true);

      clients = clients.filter(({ token }) =>
        !expo.isExpoPushToken(token));

      const messages = clients.map(({ token, stations }) =>
        stations.map(ID => ({
          to: token,
          sound: 'default',
          body: currentStation[ID],
          data: {},
        })));

      const chunks = expo.chunkPushNotifications(messages);
      await Promise.all(chunks.map(chunk =>
        expo.sendPushNotificationsAsync(chunk)));
    });

    queue.add({}, TIMER);
    return queue;
  },
});

