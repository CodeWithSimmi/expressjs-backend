const express = require("express");
const router = express.Router();
const { cryptoappdb } = require("../../connection");


router.get("/fetch", async (req, res) => {
  try {
    const connect = await cryptoappdb();
    const fetchsignupdata = await connect.find().toArray();
    console.log(fetchsignupdata);
    res.json(fetchsignupdata);
  } catch (error) {
    console.error("Error fetching data from database:", error.message);
    res.status(500).json({ error: "Failed to fetch data from the database" });
  }
});

router.post("/add", async (req, res) => {
  try {

    const connectdb = await cryptoappdb();
    const insertdata = await connectdb.insertOne(req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ error: "All fields Required" });
    }
    const formdetails = { username, email, password };

    console.log(formdetails);

    res.json(formdetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.put("/update", async (req, res) => {
  try {
    
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and Password are required" });
    }

    const connect = await cryptoappdb();

    const updatevalues = await connect.updateOne(
      { username: username },
      { $set: { password: password } }
    );

    if (updatevalues.matchedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(updatevalues);
    res.status(200).json({
      message: "User password updated successfully",
      result: updatevalues,
    });
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(500).json({ error: "Failed to update user" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { username } = req.body;

   
    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const connect = await cryptoappdb();

    const deleteResult = await connect.deleteOne({ username: username });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", result: deleteResult });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
