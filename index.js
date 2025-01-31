const express =require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())


// req = request , res = response
app.get("/get-all-contact-details",(req,res)=>{
    res.json([1,2,3])
})

app.post("/post-contact-details",(req,res)=>{
 
    const body = req.body ;
    console.log(body);
    res.json({
        ...body
    });

    res.end();
})


app.listen(4000,()=>{
    console.log("listing on port 4000")
})


