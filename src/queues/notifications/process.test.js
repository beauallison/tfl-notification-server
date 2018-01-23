/* eslint-disable global-require */
jest.mock('expo-server-sdk', () => require('../_mocks_/expo'));
jest.mock('../../users', () => require('../../users/_mocks_/index'));

const process = require('./process');

describe('queues/notifications/process', () =>
  it('should send notifications', () =>
    expect(process()).resolves.toBeUndefined()));
