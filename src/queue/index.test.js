const queue = require('./index');

describe('queue()', () => {
  it('should return bull queues', () => {
    expect(queue.notifications().name).toEqual('notificationsQueue');
    expect(queue.stations().name).toEqual('stationsStatusQueue');
  });
});
