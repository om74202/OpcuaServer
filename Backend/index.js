const express =require("express");

const getNodesRoute = require("./routes/getNodes");
const cors  = require("cors")
const app=express();

app.use(express.json()); // ✅ Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

// app.use("/getAllNodes",getAllNodesRoute);
app.get("/",(req,res)=>{
    res.json({
        message:"Hiiiiiiiiiiiiiiiiiiiiiii"
    })
})
app.use("/getNodes",getNodesRoute)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})