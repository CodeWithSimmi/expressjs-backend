const express = require("express");
const { usersdb } = require("./connection");
// const { route } = require("./array");
const router = express.Router();
const { ObjectId } = require("mongodb");

// router.get("/all", async (req, res) => {
//   const data = req.body;
//   console.log(data);
//   //Establish Database Connection
//     const connectdb = await usersdb();

//   //Fetch all users
//      const fetchdata = await connectdb.find().toArray();
//  res.json(fetchdata);
// });

router.get("/all",async(req,res)=>{
    const connectdb = await usersdb();
    const fetchdata = await connectdb.find().toArray();
    console.log(fetchdata);
    res.send(fetchdata);

});

router.post("/add", async (req, res) => {
const connectdb = await usersdb();
const insertdata = await connectdb.insertOne(req.body);

console.log(insertdata);
    res.json(insertdata);

});

// router.put("/update",async(req,res)=>{
// const connectdb = await usersdb();
// const updatedata = await connectdb.updateOne(req.body);

// console.log(updatedata);
// res.json(updatedata);

// });


router.put("/upd",async(req,res)=>{
    const connectdb = await usersdb();
    const updatedata = await connectdb.updateOne(
        {userName:"khushi123"},
        {$set:{fullName:"khushi rani"}}
        // {$set:{emailID:req.body}}
    )
    res.send({updatedata:"updated"})
})

// router.delete("/dlt",async(req,res)=>{
//     const connectdb = await usersdb();
//     const deletedata = await connectdb.deleteOne(
//         {emailID: "simmi@gmail.com" })
//         console.log(deletedata);
//     res.json({ deletedata:"done"});
// })



router.delete("/dlt/:id",async(req,res)=>{
    const connectdb = await usersdb();
    const deletedata = await connectdb.findOneAndDelete(new ObjectId(req.params.id));
        
        res.json(deletedata);
       
})


module.exports = router;
