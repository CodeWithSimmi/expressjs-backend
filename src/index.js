// including express module and initialising an app
const express = require("express");
const cors = require("cors");
const app = express();





//built middleware  express.json()
app.use(express.json()); // load in to application
app.use(cors());

// middleware file export
// const middleware = require("./middleware");
// app.use("/midd", middleware);

//approute file export
// const approute = require("./approute");
// app.use("/apps", approute);

//array file export
const array = require("../array");
app.use("/array", array);

//string file export
const string =require("../string");
app.use("/string",string);


//crudapidb file export
// const cruddb =require("./crud-api-db")
// app.use("/users",cruddb)

//contact-crud file export
const contactcrud = require("../contact-crud")
app.use("/contacts",contactcrud)

//crud-beauty 
const beauty_product = require("./crud-beauty");
app.use("/beauty" ,beauty_product );

//crud-crypto-signup 
const crypto_signup = require("./auth/signup/crud-signup-crypto");
app.use("/cryptosignup",crypto_signup);

//crud-crypto-signin
const crypto_signin = require("./auth/signin/crud-signin-crypto");
app.use("/cryptosignin",crypto_signin);

const crypto = require("./crypto/crypto");
app.use("/crypto",crypto);


// req = request , res = response
app.get("/get-all-contact-details", (req, res) => {
  res.json([1, 2, 3]);
});

app.post("/post-contact-details", (req, res) => {
  const body = req.body;
  console.log(body);
  res.json({
    ...body,
  });

  res.end();
});

// start your app or server
// listen have two argument (port number and show the message when your app start

app.listen(4000, () => {
  console.log("listening on port 4000");
});
