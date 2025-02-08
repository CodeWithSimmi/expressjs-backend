const { MongoClient } = require("mongodb");
const { database } = require("../config");

const client = new MongoClient(database);

async function contactdb() {
  const connect = await client.connect();

  const databaseconnect = connect.db("contact-database");
  return databaseconnect.collection("formdata-collection");
}
module.exports = { contactdb };
