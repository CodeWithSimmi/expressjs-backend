const express = require("express");
// const { usersdb } = require("./connection");
const router = express.Router();

// Initial array
let dataArray = [1, 2, 3, 67, 87];

// GET: Send the whole array
router.get("/arr", (req, res) => {
  console.log(dataArray);
  res.json(dataArray);
});

// POST: Push an element to the end of the array
router.post("/add", async (req, res) => {
  const newElement = req.body.newElem; // Get the element from the request body
  // const connection = await usersdb();
  // const insertdata = await connection.insertOne(req.body);
  if (newElement !== undefined) {
    // Ensure the element is not undefined
    dataArray.push(newElement); // Add the element to the array
    console.log(dataArray);
    res.send(dataArray);
  }
});

// PUT: Update an array element
router.put("/update/:index", (req, res) => {
  const index = +req.params.index - 1; // Get index from URL
  const { element } = req.body; // Get element from request body

  if (index >= 0 && index < dataArray.length) {
    dataArray[index] = element; // Update element at the specified index
    // console.log(dataArray);
    res
      .status(200)
      .json({ message: "Element updated successfully", dataArray });
  } else {
    res.status(400).json({ message: "Invalid index" });
  }
});

// DELETE: Remove an array element
router.delete("/delete/:simran", (req, res) => {
  const index = Number(req.params.simran); // Convert index to number
  if (index >= 0 && index < dataArray.length) {
    dataArray.splice(index, 1); // Remove the element at the specified index
    res.json({
      message: `Element at index ${index} deleted successfully`,
      dataArray,
    });
  } else {
    res.status(400).json({ message: "Invalid index" });
  }
});

module.exports = router;
