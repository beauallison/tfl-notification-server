const _ = require('lodash');
const Queue = require('bull');
const cron = require('cronstrue');
const Expo = require('expo-server-sdk');
const logger = require('../logger');
const { redis } = require('config');
const getStatus = require('../getStatus');
const { LINES } = require('../../constants');

const CRON = '* * * * *';
const TIMER = { repeat: { cron: CRON } };

const expo = new Expo();
const currentStation = _.cloneDeep(LINES);

module.exports = {
  stations: () => {
    logger.info('Stations Status - Creating queue');
    const queue = new Queue('stationsStatusQueue', redis);

    queue.process(() =>
      Promise.all(_.map(currentStation, async ({ station }, ID) => {
        logger.info(`${station} Status - Downloading`);
        const { status } = await getStatus(station);

        logger.info(`${station} Status - ${status}`);
        currentStation[ID].status = status;
      })));

    logger.info(`Stations Status - Job executing ${cron.toString(CRON).toLowerCase()}`);
    queue.add({}, TIMER);
    return queue;
  },
  notifications: () => {
    const queue = new Queue('notificationsQueue', redis);

    queue.process(async () => {
      const clients = await Promise.resolve(true);

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
};

