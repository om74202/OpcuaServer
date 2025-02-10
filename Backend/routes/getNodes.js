const express=require("express");
const getNodes = require("../Components/ListFunction");
const getNodesRoute=express.Router();

getNodesRoute.get("/",async (req,res)=>{
    const nodes=await getNodes("opc.tcp://LAPTOP-E1KCH3KD:53530/OPCUA/SimulationServer");
    res.json({
        nodes:nodes
    })
})

module.exports=getNodesRoute;