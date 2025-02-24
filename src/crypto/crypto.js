const express = require("express");
const router = express.Router();
const { cryptourl } = require("../config");

router.get("/getallcrypto", async (req, res) => {
  try {
    const response = await fetch(
      `${cryptourl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    return err;
  }
});

module.exports = router;
