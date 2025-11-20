const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

let mongo;

module.exports.connect = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri(); // ALWAYS returns a plain string

  await mongoose.connect(uri, {
    dbName: "testdb",
  });
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongo) await mongo.stop();
};
