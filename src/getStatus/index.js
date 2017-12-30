const _ = require('lodash');
const got = require('got');
const { api } = require('config');

// GET /Line/{ids}/Status
// https://api.tfl.gov.uk/Line/{id}/Status
module.exports = async (line) => {
  const { body } = await got(`${api}/Line/${line}/Status?detail=true`, { json: true });

  return {
    status: _.get(body, '[0].lineStatuses[0].statusSeverityDescription', 'Unknown'),
    severity: _.get(body, '[0].lineStatuses[0].statusSeverity', 'Unknown'),
  };
};

