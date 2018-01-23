const _ = require('lodash');
const logger = require('../../logger');
const getStatus = require('../../getStatus');
const { LINES } = require('../../../constants');

const currentStation = _.cloneDeep(LINES);

module.exports = () =>
  Promise.all(_.map(currentStation, async ({ station }, ID) => {
    logger.info(`${station} Status - Downloading`);
    const { status } = await getStatus(station);

    logger.info(`${station} Status - ${status}`);
    currentStation[ID].status = status;
  }));
