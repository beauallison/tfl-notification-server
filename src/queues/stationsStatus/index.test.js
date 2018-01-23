const stationsStatus = require('./');

const CRON = '* * * * *';
const TIMER = { repeat: { cron: CRON } };

describe('queues/stationsStatus', () =>
  it('should return stationsStatus queue', () =>
    expect(stationsStatus(CRON, TIMER).name).toEqual('stationsStatusQueue')));
