const queues = require('./index');

describe('queues()', () => {
  it('should return bull queues', () => {
    expect(queues.notifications().name).toEqual('notificationsQueue');
    expect(queues.stationsStatus().name).toEqual('stationsStatusQueue');
  });
});
