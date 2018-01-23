const queues = require('./queues');
const app = require('./app');

queues.stations();

module.exports = app;
