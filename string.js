const express = require("express");
const router = express.Router();

const strarr = ["simmi", "megha", "pooja", "geet"];

router.get("/str", (req, res) => {
  console.log(strarr);
  res.send(strarr);
});

router.post("/addstr", (req, res) => {
  const newstr = +req.body.str;
  if (newstr !== undefined) {
    strarr.unshift(newstr);
    res.send(strarr);
  }
});

router.put("/updatestr/:index", (req, res) => {
  const index = req.params.index;
  const  {updatstr } = req.body;
  if (index > 0 && index < strarr.length) {
    strarr[index] = updatstr;
    res.status(200).json({ message: "string updated successfully", strarr });
  } else {
    res.status(400).json({ message: "Invalid index" });
  }
});

router.delete("/dlt/:index",(req,res)=>{
  const index =Number(req.params.index);
  if (index >= 0 && index < strarr.length) {
    strarr.splice(index, 1); 
      res.json({ message: `String at index ${index} deleted successfully`, strarr });
    } else {
      res.status(400).json({ message: "Invalid index" });
    }
  });

module.exports = router;
