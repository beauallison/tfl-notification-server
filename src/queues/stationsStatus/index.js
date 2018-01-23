const Queue = require('bull');
const cron = require('cronstrue');
const logger = require('../../logger');
const { redis } = require('config');

const process = require('./process');

module.exports = (CRON, TIMER) => {
  logger.info('Stations Status - Creating queue');
  const queue = new Queue('stationsStatusQueue', redis);

  queue.process(process);

  logger.info(`Stations Status - Job executing ${cron.toString(CRON).toLowerCase()}`);
  queue.add({}, TIMER);
  return queue;
};
