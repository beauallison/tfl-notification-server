/* eslint-disable class-methods-use-this */
module.exports = class Expo {
  chunkPushNotifications() { return [true]; }
  async sendPushNotificationsAsync(item) { return item; }
};
