const _ = require('lodash');
const logger = require('../../logger');
const getStatus = require('../../getStatus');
const { LINES } = require('../../../constants');

const currentStation = _.cloneDeep(LINES);

module.exports = () =>
  Promise.all(_.map(currentStation, async ({ station }, ID) => {
    const Station = _.upperFirst(station);
    logger.info(`Stations Status - ${Station} - Downloading status`);
    const { status } = await getStatus(station);

    logger.info(`Stations Status - ${Station} - ${status}`);
    currentStation[ID].status = status;
  }));
