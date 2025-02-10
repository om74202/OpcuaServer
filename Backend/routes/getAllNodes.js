const express=require("express");
const { send } = require("process");
const main = require("../opcua");
const getAllNodesRoute=express.Router();

getAllNodesRoute.get("/",async (req,res)=>{
    const link=req.query.link;
    
    const Nodes=await main("opc.tcp://LAPTOP-E1KCH3KD:53530/OPCUA/SimulationServer");
    Nodes.forEach((node)=>{
        
    })
    res.json({
        // nodes:Nodes.join(""),
        message:"Hello World from nodemon  "
    })
})

module.exports=getAllNodesRoute;