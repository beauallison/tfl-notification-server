const queue = require('./index');

describe('queue()', () => {
  it('should return bull queues', () => {
    const Queue = queue();
    expect(Queue.notifications().name).toEqual('notificationsQueue');
    expect(Queue.stations().name).toEqual('stationsStatusQueue');
  });
});
