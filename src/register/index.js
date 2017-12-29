const boom = require('boom');
const { send, json } = require('micro');
const Collection = require('../users');

module.exports = async (req, res) => {
  try {
    const users = await new Collection();

    if (req.method !== 'POST') {
      throw boom.forbidden();
    }

    const body = await json(req);
    await users.register(body);

    return 'OK';
  } catch (err) {
    if (err.isBoom) {
      const { output } = err;
      return send(res, output.statusCode, output.message);
    }

    return send(res, 500, 'Invalid Error');
  }
};
