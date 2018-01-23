const uuid = require('uuid'); // eslint-disable-line import/no-extraneous-dependencies

module.exports.generateToken = () => `ExpoPushToken[${uuid.v4()}]`;
