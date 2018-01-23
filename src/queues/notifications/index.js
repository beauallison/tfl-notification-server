const Queue = require('bull');
const { redis } = require('config');
const process = require('./process');

module.exports = (TIMER) => {
  const queue = new Queue('notificationsQueue', redis);

  queue.process(process);
  queue.add({}, TIMER);
  return queue;
};
