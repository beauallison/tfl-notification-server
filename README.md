# TFL Notification Server

This repo is a work in progress.

This is a microservice for sending push notifications to users about Transport for London station updates. It works in conjunction with the [React Native TFL Notifications][react-native-repo] application for notification registration.

## Infrastructure Requirements

- MongoDB - Storage for user tokens and stations
- Redis - Queue management for updating station status and sending push notifications.

## Dependencies

This project is built using

- Node.js version 8.9+
- [Micro][micro] - A microservice framework
- [Bull][bull] - Redis based queue management
- [Expo Server SDK][expo] - Server side library for working with Expo

## Local Setup

These instructions require Docker and will deploy a local instance of MongoDB, Redis, and the Application Server.

The Docker compose file can be found under `dev/docker-compose.yml`

```shell
git clone https://github.com/beauallison/tfl-notification-server

cd tfl-notification-server

npm install

npm run dev
```

<!-- Links -->

[react-native-repo]:https://github.com/beauallison/react-native-tfl-notifications

<!-- Packages -->
[micro]: https://www.npmjs.com/package/micro
[bull]: https://www.npmjs.com/package/bull
[expo]: npmjs.com/package/expo-server-sdk
