const express = require("express");
const router = express.Router();
const signinsche = require("../../models/signin");
const { cryptoappdb2 } = require("../../connection");
const {ObjectId} = require("mongodb");
router.get("/fetch", async (req, res) => {
  try {
    const connectdb = await cryptoappdb2();
    const fetchdata = await connectdb.find().toArray();
    console.log(fetchdata);
    res.status(200).json(fetchdata);
  } catch (err) {
    res.json(err);
  }
});

router.post("/add", async (req, res) => {
  const connectdb = await cryptoappdb2();
  const insertdata = await connectdb.insertOne(req.body);
  console.log(insertdata);
  res.json(insertdata);
});



router.put("/update/:id", async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    
    const connectdb = await cryptoappdb2();
    const updateschema = new signinsche(body)
    const putid =new ObjectId(id);
    
    const updatedata = await connectdb.findOneAndUpdate( 
      putid,updateschema,{new:true}
    );

    if (updatedata.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(updatedata);
    res.status(200).json(updatedata);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "email is required" });
    }

    const connect = await cryptoappdb2();

    const deleteResult = await connect.deleteOne({ email: email });

    res
      .status(200)
      .json({ message: "User deleted successfully", result: deleteResult });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
