const { MongoClient } = require("mongodb");
const { database } = require("../config");

const client = new MongoClient(database);

async function usersdb() {
  const connect = await client.connect();

  const databaseconnect = connect.db("simran-database");
  return databaseconnect.collection("user-collection");
}

async function beautyproductdb() {
  const connect = await client.connect();

  const databaseconnect = connect.db("simran-database");
  return databaseconnect.collection("beautyproduct-collection");
}

module.exports = { usersdb ,beautyproductdb};
