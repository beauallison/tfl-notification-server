const process = require('./process');

describe('queues/stationsStatus/process', () =>
  it('should update status for all stations', async () => {
    const res = await process();
    expect(res.filter(v => v)).toEqual([]);
  }));
