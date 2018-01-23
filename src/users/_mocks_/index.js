const utils = require('../../../utils');

module.exports = class Users {
  // eslint-disable-next-line class-methods-use-this
  getAll() {
    return [
      {
        token: [utils.generateToken()],
        stations: ['LONDON'],
      },
    ];
  }
};
