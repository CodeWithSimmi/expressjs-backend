const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  database: process.env.MONGODBURI,
  cryptourl: process.env.CRYPTOURL,
};
