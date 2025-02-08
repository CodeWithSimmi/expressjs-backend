const express = require("express");
const { contactdb } = require("./contact-connection");
const router = express.Router();

let contact = [];

router.post("/add", async (req, res) => {
  const connectdb = await contactdb();

  const insertformdata = await connectdb.insertOne(req.body);

  const { phoneNo, fullName, emailID } = req.body;

  if (!phoneNo || !fullName || !emailID) {
    res.status(400).json("all fileds required");
  }

  const formdata = { phoneNo, fullName, emailID };

  contact.push(formdata);
  console.log(contact);
  res.json(contact);
});

// const schema = { 
//     "brandName":"",
//     "reviews":"",
//     "price" : "",
//     "discount":"",
//     "return_policy":false,
//     "expairy_date":"",
//     "review_count":"",
// }

module.exports = router;
