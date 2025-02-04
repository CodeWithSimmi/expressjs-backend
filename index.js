// including express module and initialising an app
const express = require("express");
const cors = require("cors");
const app = express();

//built middleware  express.json()
app.use(express.json()); // load in to application
app.use(cors());

// middleware file export
const middleware = require("./middleware");
app.use("/midd", middleware);

//approute file export
const approute = require("./approute");
app.use("/apps", approute);

//array file export
const array = require("./array");
app.use("/array", array);

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
  console.log("listing on port 4000");
});
