const stationsStatus = require('./stationsStatus');
const notifications = require('./notifications');

const CRON = '* * * * *';
const TIMER = { repeat: { cron: CRON } };

module.exports = {
  stationsStatus: () => stationsStatus(CRON, TIMER),
  notifications: () => notifications(TIMER),
};
