const express =require("express");
const getAllNodesRoute = require("./routes/getAllNodes");
const getNodesRoute = require("./routes/getNodes");
const app=express();


app.use("/getAllNodes",getAllNodesRoute);
app.use("/getNodes",getNodesRoute)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})