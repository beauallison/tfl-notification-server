const notifications = require('./');

const CRON = '* * * * *';
const TIMER = { repeat: { cron: CRON } };

describe('queues/notifications', () =>
  it('should return notifications queue', () =>
    expect(notifications(TIMER).name).toEqual('notificationsQueue')));
