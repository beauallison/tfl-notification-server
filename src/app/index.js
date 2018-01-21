const _ = require('lodash');
const boom = require('boom');
const { send, json } = require('micro');
const Collection = require('../users');

module.exports = async (req, res) => {
  try {
    const users = await new Collection();
    if (req.method !== 'POST') throw boom.forbidden();

    const body = await json(req);
    await users.manage(body);

    return 'OK';
  } catch (err) {
    const statusCode = _.get(err, 'output.payload.statusCode', 500);
    const message = _.get(err, 'output.payload.message', 'Server error');

    return send(res, statusCode, message);
  }
};
