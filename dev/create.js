db.createCollection('users');

db.users.createIndex({ token: 1 }, { unique: true });
