const express=require("express");
const {OPCUAClient,AttributeIds,StatusCodes}=require("node-opcua")

const getNodesRoute=express.Router();

getNodesRoute.post("/",async (req,res)=>{
    const { url, nodeId } = req.body;
    
    const client = OPCUAClient.create({ endpointMustExist: false });
    try {
        await client.connect(url);
        const session = await client.createSession();
        // read datavalue
    
        const browseResult = await session.browse(nodeId || "RootFolder");


        const dataValue = await session.read({
            nodeId:nodeId,
            attributeId: AttributeIds.Value,
        });
        let value="";

        const dataType=await session.read({
            nodeId:nodeId,
            attributeId:AttributeIds.DataType
        })
        const dataTypeDefinition = await session.read({
            nodeId: dataType.value.value,  // Fetch the NodeId of the DataType
            attributeId: AttributeIds.BrowseName // Read the human-readable name
        });

        if (dataValue.statusCode === StatusCodes.Good) {
            // console.log("Value:", dataValue.value.value);
            console.log(dataTypeDefinition.value.value.name)
            value=`value-> ${dataValue.value.value} dataType ->${dataTypeDefinition.value.value.name}`
          }else {
            console.log("This node has null value")
          }


        const nodes = browseResult.references.map(ref => ({
            id: ref.nodeId.toString(),
            name: ref.displayName.text,
            value:value
        }));
        
        await session.close();
        await client.disconnect();
        
        res.json({ nodes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
})

module.exports=getNodesRoute;