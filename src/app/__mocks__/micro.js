module.exports = {
  send: (res, statusCode, message) => ({ statusCode, message }),
  json: ({ body }) => body,
};
