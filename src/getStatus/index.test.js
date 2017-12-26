const getStatus = require('./index');
const { LINES } = require('../../constants');

describe('getStatus()', () => {
  it('should return Nothern line data', async () => {
    const { status, severity } = await getStatus(LINES.NORTHERN.station);
    expect(status).toBe('Good Service');
    expect(severity).toBe(10);
  });
});
